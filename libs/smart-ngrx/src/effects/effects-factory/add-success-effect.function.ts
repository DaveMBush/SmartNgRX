import { inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { EntityAdapter } from '@ngrx/entity';
import { map, tap, timer } from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { assert } from '../../common/assert.function';
import { actionServiceRegistry } from '../../registrations/action-service-registry.class';
import { store } from '../../selector/store.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';

/**
 * This is the effect that handles adding a new row to the store.
 *
 * @param actions The action that will have the type of action that was triggered
 *   so we know if we should handle it
 * @param adapter the adapter for the entity so we can grab the id for the row
 *   when we need it in the effect
 *
 * @returns The effect that will be called when the action is triggered
 */
export function addSuccessEffect<T extends SmartNgRXRowBase = SmartNgRXRowBase>(
  actions: ActionGroup<T>,
  adapter: EntityAdapter<T>,
) {
  return function addSuccessEffectFunction(
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
  ) {
    return actions$.pipe(
      ofType(actions.addSuccess),
      tap(function addSuccessEffectTap(action) {
        // we want the garbage collection to happen well after the parent has refreshed
        // so that the system doesn't insert a dummy record while it is still in the
        // parent's child array.
        timer(1000).subscribe(function addSuccessEffectTimerSubscribe() {
          const s = store();
          s.dispatch(
            actions.remove({
              ids: [adapter.selectId(action.oldRow) as string],
            }),
          );
        });
      }),
      map(function addSuccessEffectMap(action) {
        const parentService = actionServiceRegistry.register(
          action.feature,
          action.entity,
        );
        assert(
          !!parentService,
          `the service for ${action.feature}:${action.entity} is not available`,
        );
        const oldId = adapter.selectId(action.oldRow) as string;
        parentService.replaceIdInParents(oldId, action.newRow.id);
      }),
    );
  };
}
