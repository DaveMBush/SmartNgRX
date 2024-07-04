import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';
import { markParentsDirty } from './mark-parents-dirty.function';

/* jscpd:ignore-start */
/**
 * This is the effect that handles adding a new row to the store.
 *
 * @param effectServiceToken the effect token for the service that will be called
 * @param actions The action that will have the type of action that was triggered
 *   so we know if we should handle it
 *
 * @returns The effect that will be called when the action is triggered
 */
export function addEffect<T extends SmartNgRXRowBase>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
) {
  return (
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    effectService = inject(effectServiceToken),
  ) => {
    /* jscpd:ignore-end */
    return actions$.pipe(
      ofType(actions.add),
      concatMap((action) => {
        return effectService.add(action.row).pipe(
          // action.parentService has to get passed to map and catchError
          // could we get the action from the registration instead of passing
          // it in since we are in an effect that we own?
          map((rows) => {
            return actions.addSuccess({
              oldRow: action.row,
              newRow: rows[0],
              parentId: action.parentId,
              parentFeature: action.parentFeature,
              parentEntityName: action.parentEntityName,
            });
          }),
          catchError((_: unknown, __) => {
            markParentsDirty(action.parentFeature, action.parentEntityName, [
              action.parentId,
            ]);
            // because NgRX requires an action to be returned
            // from an effect that returns an action
            return of({ type: 'noop' });
          }),
        );
      }),
    );
  };
}
