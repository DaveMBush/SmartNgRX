import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';

import { ActionGroup } from '../../functions/action-group.interface';
import { MarkAndDelete } from '../../types/mark-and-delete.interface';
import { EffectService } from '../effect-service';

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
export function updateEffect<T extends MarkAndDelete>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
) {
  return (
    actions$ = inject(Actions),
    effectService = inject(effectServiceToken),
  ) => {
    return actions$.pipe(
      ofType(actions.update),
      concatMap((action) => {
        return effectService.update(action.old.row, action.new.row);
      }),
      map((rows) => {
        return actions.loadByIdsSuccess({ rows });
      }),
    );
  };
}
