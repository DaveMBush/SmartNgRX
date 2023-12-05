import { inject, InjectionToken, NgZone } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import { ActionGroup } from '../../functions/action-group.interface';
import { MarkAndDelete } from '../../types/mark-and-delete.interface';
import { bufferAction } from '../buffer-action.function';
import { EffectService } from '../effect-service';

/**
 * This is the effect that loads the ids from the service.
 *
 * @param effectServiceToken the effect service token that knows how to load the ids
 * @param actions the action group for the source provided
 * @returns the loadByIds effect
 */
export function loadByIdsEffect<T extends MarkAndDelete>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
) {
  return (
    actions$ = inject(Actions),
    actionService = inject(effectServiceToken),
    zone: NgZone = inject(NgZone),
  ) => {
    return actions$.pipe(
      ofType(actions.loadByIds),
      bufferAction(zone),
      mergeMap((ids) => {
        return actionService.loadByIds(ids);
      }),
      map((rows) => actions.loadByIdsSuccess({ rows })),
    );
  };
}
