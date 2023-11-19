import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { ActionGroup } from '../../functions/action-group.interface';
import { EffectService } from '../effect-service';

/**
 * This is an internal function that defines the load effect
 *
 * @param effectServiceToken - Token for the effect service that loads the data
 * @param actions - The action group for the source provided
 * @returns The load effect
 */
export function loadEffect<T>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
) {
  return (
    actions$ = inject(Actions),
    actionService = inject(effectServiceToken),
  ) => {
    return actions$.pipe(
      ofType(actions.load),
      switchMap(() => {
        return actionService.load();
      }),
      map((rows) => {
        return actions.loadSuccess({ rows });
      }),
    );
  };
}
