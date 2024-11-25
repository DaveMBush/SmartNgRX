import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, of } from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';
import { markFeatureParentsDirty } from './mark-feature-parents-dirty.function';

/* jscpd:ignore-start */
/**
 * This is the effect that handles deleting a row from the store.
 *
 * @param effectServiceToken token for the service that the user has provided to implement delete
 * @param actions the action group that has the actions we can trigger and listen for
 * @returns The action to fire as a result of the delete, if any
 */
export function deleteEffect<T extends SmartNgRXRowBase>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
) {
  return function deleteEffectFunction(
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    effectService = inject(effectServiceToken),
  ) {
    /* jscpd:ignore-end */
    return actions$.pipe(
      ofType(actions.delete),
      concatMap(function deleteEffectConcatMap(action) {
        return effectService.delete(action.id).pipe(
          catchError(function deleteEffectConcatMapCatchError(_: unknown, __) {
            markFeatureParentsDirty(action);
            return of();
          }),
        );
      }),
    );
  };
}
