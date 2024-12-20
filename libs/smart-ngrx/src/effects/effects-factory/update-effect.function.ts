import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  debounceTime,
  map,
  mergeMap,
  of,
  scan,
  tap,
} from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { assert } from '../../common/assert.function';
import { actionServiceRegistry } from '../../registrations/action-service-registry.class';
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
 * @param feature the name of the feature this is for
 * @param entity the name of the entity this is for
 * @returns the update effect
 */
export function updateEffect<T extends SmartNgRXRowBase>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
  feature: string,
  entity: string,
) {
  const lastRow: Map<string, T> = new Map();
  const lastRowTimeout: Map<string, number> = new Map();

  return function updateEffectFunction(
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    effectService = inject(effectServiceToken),
  ) {
    return actions$.pipe(
      ofType(actions.update),
      tap(function updateEffectTap(action) {
        manageMaps<T>(lastRow, lastRowTimeout, action);
      }),
      // scan allows us to change fields in multiple rows
      // within the same event loop
      scan(
        function updateEffectScan(acc, action) {
          return {
            ...acc,
            [action.old.row.id]: action,
          };
        },
        {} as Record<string, { old: RowProp<T>; new: RowProp<T> }>,
      ),
      // debounceTime(1) lets us set multiple fields in a row but only
      // call the server once
      debounceTime(1),
      // mergeMap allows us to call the server once for each
      // row that was updated
      mergeMap(function updateEffectMergeMap(accActions) {
        return Object.values(accActions);
      }),
      concatMap(function updateEffectConcatMap(action) {
        return effectService.update(action.new.row).pipe(
          catchError(function updateEffectConcatMapCatchError() {
            return of([action.old.row]);
          }),
        );
      }),
      map(function updateEffectMap(rows) {
        // set the last row to the row we got back here.
        // rows only has one row it it we just return an array
        // so we can reuse code.
        const now = Date.now();
        const id = rows[0].id;
        // delete the timeout to keep things in order.
        lastRowTimeout.delete(id);
        lastRowTimeout.set(id, now);
        lastRow.set(id, rows[0]);
        updateRow(rows, feature, entity);
      }),
    );
  };
}

function updateRow<T extends SmartNgRXRowBase>(
  rows: T[],
  feature: string,
  entity: string,
) {
  // have to call the service to pickup the registration
  const service = actionServiceRegistry.register(feature, entity);
  assert(!!service, `the service for ${feature}:${entity} is not available`);
  service.loadByIdsSuccess(rows);
}
