import { NgZone } from '@angular/core';
import { Action } from '@ngrx/store';
import {
  asapScheduler,
  buffer,
  debounceTime,
  map,
  Observable,
  Subscriber,
} from 'rxjs';

import { castTo } from '../common/cast-to.function';

function mainBuffer(
  source: Observable<Action>,
  bufferTime: number,
  ngZone: NgZone,
  observer: Subscriber<string[]>,
) {
  source
    .pipe(
      map((a) => castTo<{ ids: string[] }>(a).ids),
      buffer(source.pipe(debounceTime(bufferTime, asapScheduler))),
      map((ids: string[][]) => {
        let newIds: string[] = [];
        ids.forEach((ids2) => {
          newIds = [...newIds, ...ids2];
        });
        return newIds;
      }),
      map((ids) => ids.filter((c, index) => ids.indexOf(c) === index)),
    )
    .subscribe({
      next: (value) => ngZone.run(() => observer.next(value)),
      error: (err: unknown) => ngZone.run(() => observer.error(err)),
      complete: () => ngZone.run(() => observer.complete()),
    });
}

/**
 * This is an internal function that is used by the Effects to buffer
 * IDs of an action coming into an effect so that we can dispatch
 * them independently but send them to the server in a single request.
 *
 * NOTE: bufferAction assumes an array of ids is passed to the action
 * it is buffering.
 *
 * ## Usage:
 *
 * ``` typescript
 *  load$ = createEffect(
      (
        actions$ = inject(Actions),
        actionService = inject(effectServiceToken),
        zone: NgZone = inject(NgZone)
      ) => {
        return actions$.pipe(
          ofType(actions.loadByIds),
          bufferAction(zone), // <--- buffer the ids
          mergeMap((ids) => actionService.loadByIds(ids)),
          map((rows) => actions.loadByIdsSuccess({ rows }))
        );
      },
      { functional: true }
    );
 * ```
 * @param ngZone - The zone to use to run outside of Angular.
 * @param bufferTime - The time to buffer the ids before sending them to the server.
 *     The default is 1ms which only allow the buffer to last until the thread frees up
 *     and is probably all we will ever need.
 * @returns The buffered ids.
 */
export function bufferAction(
  ngZone: NgZone,
  bufferTime = 1,
): (source: Observable<Action>) => Observable<string[]> {
  return (source: Observable<Action>): Observable<string[]> => {
    return new Observable<string[]>((observer) => {
      ngZone.runOutsideAngular(() =>
        mainBuffer(source, bufferTime, ngZone, observer),
      );
    });
  };
}
