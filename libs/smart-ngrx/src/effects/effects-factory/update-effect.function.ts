import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import {
  concatMap,
  debounceTime,
  filter,
  map,
  mergeMap,
  scan,
  tap,
} from 'rxjs';

import { castTo } from '../../common/cast-to.function';
import { ActionGroup } from '../../functions/action-group.interface';
import { RowProp } from '../../types/row-prop.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';
import { manageMaps } from './update-effect/manage-maps.function';

/**
 * this handles the update by calling the effectService.update()
 * method. Any errors and retries should be handled by the service
 * including reverting the optimistic update the service will return
 * the latest rows that should be sent to the store.
 *
 * To support multiple calls to the effect in sequence, we handle debounces
 * here but we use a long debounce time of 2 seconds. Since we are using optimistic
 * updates, the changes will be seen locally immediately and the user will not
 * be blocked by the debounce.
 *
 * @param effectServiceToken the token for the effectService that will be called
 * @param actions the action group for the source provided
 * @returns the update effect
 */
export function updateEffect<T extends SmartNgRXRowBase>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
) {
  const lastRow: Map<string, T> = new Map();
  const lastRowTimeout: Map<string, number> = new Map();
  return (
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    effectService = inject(effectServiceToken),
  ) => {
    return actions$.pipe(
      ofType(actions.update),
      tap((action) => {
        manageMaps<T>(lastRow, lastRowTimeout, action);
      }),
      // scan allows us to change fields in multiple rows
      // within the same event loop
      scan(
        (acc, action) => ({
          ...acc,
          [castTo<{ id: string }>(action.old.row).id]: action,
        }),
        {} as Record<string, { old: RowProp<T>; new: RowProp<T> }>,
      ),
      // debounceTime(1) lets us set multiple fields in a row but only
      // call the server once
      debounceTime(1),
      // mergeMap allows us to call the server once for each
      // row that was updated
      mergeMap((accActions) => {
        return Object.values(accActions);
      }),
      // we should never need the filter, but just to be safe.
      filter((action) => action !== undefined),
      concatMap((action) => {
        const id = castTo<{ id: string }>(action.old.row).id;
        return effectService.update(lastRow.get(id)!, action.new.row);
      }),
      map((rows) => {
        // set the last row to the row we got back here.
        // rows only has one row it it we just return an array
        // so we can reuse code.
        const now = Date.now();
        const id = castTo<{ id: string }>(rows[0]).id;
        // delete the timeout to keep things in order.
        lastRowTimeout.delete(id);
        lastRowTimeout.set(id, now);
        lastRow.set(id, rows[0]);
        return actions.loadByIdsSuccess({ rows });
      }),
    );
  };
}
