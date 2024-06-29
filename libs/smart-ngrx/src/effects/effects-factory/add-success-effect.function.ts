import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { EntityAdapter } from '@ngrx/entity';
import { map, tap, timer } from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { store } from '../../selector/store.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';
import { markParentsDirty } from './mark-parents-dirty.function';

/**
 * This is the effect that handles adding a new row to the store.
 *
 * @param effectServiceToken the effect token for the service that will be called
 * @param actions The action that will have the type of action that was triggered
 *   so we know if we should handle it
 * @param adapter the adapter for the entity so we can grab the id for the row
 *   when we need it in the effect
 *
 * @returns The effect that will be called when the action is triggered
 */
export function addSuccessEffect<T extends SmartNgRXRowBase = SmartNgRXRowBase>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
  adapter: EntityAdapter<T>,
) {
  return (
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    _ = inject(effectServiceToken),
  ) => {
    return actions$.pipe(
      ofType(actions.addSuccess),
      tap((action) =>
        // we want the garbage collection to happen well after the parent has refreshed
        // so that the system doesn't insert a dummy record while it is still in the
        // parent's child array.
        timer(1000).subscribe(() => {
          const s = store();
          s.dispatch(
            actions.remove({
              ids: [adapter.selectId(action.oldRow) as string],
            }),
          );
        }),
      ),
      map((action) => {
        markParentsDirty(action.parentFeature, action.parentEntityName, [
          action.parentId,
        ]);
      }),
    );
  };
}
