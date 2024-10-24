import {
  asapScheduler,
  buffer,
  debounceTime,
  map,
  Observable,
  Subscriber,
} from 'rxjs';

import { forNext } from '../../common/for-next.function';

function flatten<T>(array: T[][]): T[] {
  const returnArray = [] as T[];
  forNext(array, (a) => {
    forNext(a, (b) => {
      returnArray.push(b);
    });
  });
  return returnArray;
}

function mainIdsBuffer(
  source: Observable<string[]>,
  bufferTime: number,
  observer: Subscriber<string[]>,
) {
  source
    .pipe(
      buffer(source.pipe(debounceTime(bufferTime, asapScheduler))),
      map((ids: string[][]) => {
        return flatten(ids);
      }),
      map((ids) => ids.filter((c, index) => ids.indexOf(c) === index)),
    ) /* jscpd:ignore-start -- intentionally duplicated */
    .subscribe({
      next: (value) => observer.next(value),
      error: (err: unknown) => observer.error(err),
      complete: () => observer.complete(),
    });
  /* jscpd:ignore-end */
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
 * load$ = createEffect(
 * (
 * actions$ = inject(Actions),
 * actionService = inject(effectServiceToken),
 * zone: NgZone = inject(NgZone)
 * ) => {
 * return actions$.pipe(
 * ofType(actions.loadByIds),
 * bufferAction(zone), // <--- buffer the ids
 * mergeMap((ids) => actionService.loadByIds(ids)),
 * map((rows) => actions.loadByIdsSuccess({ rows }))
 * );
 * },
 * { functional: true }
 * );
 * ```
 *
 * @param bufferTime The time to buffer the ids before sending them to the server.
 *     The default is 1ms which only allow the buffer to last until the thread frees up
 *     and is probably all we will ever need.
 * @returns The buffered ids.
 */
export function bufferIdsAction(
  /* istanbul ignore next */
  bufferTime = 1, // default value does not need to be tested
): (ids: Observable<string[]>) => Observable<string[]> {
  return (source: Observable<string[]>): Observable<string[]> => {
    return new Observable<string[]>((observer) => {
      mainIdsBuffer(source, bufferTime, observer);
    });
  };
}
