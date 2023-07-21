import { Action } from '@ngrx/store';
import { buffer, debounceTime, map, Observable } from 'rxjs';

import { castTo } from '../common/cast-to.function';

/**
 * bufferAction is an RxJS operator that buffers the IDs of an action
 * coming into an effect so that we can dispatch them independently but
 * send them to the server in a single request.
 *
 * ## Usage:
 *
 * ``` typescript
 *  load$ = createEffect(
      (
        actions$ = inject(Actions),
        actionService = inject(effectServiceToken)
      ) => {
        return actions$.pipe(
          ofType(actions.loadByIds),
          bufferAction(), // <--- buffer the ids
          mergeMap((ids) => actionService.loadByIds(ids)),
          map((rows) => actions.loadByIdsSuccess({ rows }))
        );
      },
      { functional: true }
    );
 * ```
 *
 * @param bufferTime - The time to buffer the ids before sending them to the server.
 *     The default is 1ms which only allow the buffer to last until the thread frees up
 *     and is probably all we will ever need.
 * @returns The buffered ids.
 */
export function bufferAction(
  bufferTime = 1
): (source: Observable<Action>) => Observable<string[]> {
  return (source: Observable<Action>): Observable<string[]> => {
    return source.pipe(
      map((a) => castTo<{ ids: string[] }>(a).ids),
      buffer(source.pipe(debounceTime(bufferTime))),
      map((ids: string[][]) => {
        let newIds: string[] = [];
        ids.forEach((ids2) => {
          newIds = [...newIds, ...ids2];
        });
        return newIds;
      }),
      map((ids) => ids.filter((c, index) => ids.indexOf(c) === index))
    );
  };
}
