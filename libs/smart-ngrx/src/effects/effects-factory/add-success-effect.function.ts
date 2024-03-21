import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { ActionGroup } from '../../functions/action-group.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';

/**
 * This is the effect that handles adding a new row to the store.
 *
 * @param effectServiceToken the effect token for the service that will be called
 * @param actions The action that will have the type of action that was triggered
 *   so we know if we should handle it
 *
 * @returns The effect that will be called when the action is triggered
 */
export function addSuccessEffect<T extends SmartNgRXRowBase>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
) {
  return (
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    _ = inject(effectServiceToken),
  ) => {
    return actions$.pipe(
      ofType(actions.addSuccess),
      map((action) => {
        return action.parentActions.markDirty({ ids: [action.parentId] });
      }),
    );
  };
}
