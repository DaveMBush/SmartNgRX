import { inject, InjectionToken, NgZone } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
import { actionServiceRegistry } from '../../registrations/action.service.registry';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { bufferAction } from '../buffer-action.function';
import { EffectService } from '../effect-service';

/**
 * This is the effect that loads the ids from the service.
 *
 * @param effectServiceToken the effect service token that knows how to load the ids
 * @param actions the action group for the source provided
 * @param feature the feature name this effect is being run for
 * @param entity the entity within the feature this effect is being run for
 * @returns the loadByIds effect
 */
export function loadByIdsEffect<T extends SmartNgRXRowBase>(
  effectServiceToken: InjectionToken<EffectService<T>>,
  actions: ActionGroup<T>,
  feature: StringLiteralSource<string>,
  entity: StringLiteralSource<string>,
) {
  return (
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    actionService = inject(effectServiceToken),
    /* istanbul ignore next -- default value, not really a condition */
    zone: NgZone = inject(NgZone),
  ) => {
    return actions$.pipe(
      ofType(actions.loadByIds),
      bufferAction(zone),
      mergeMap((ids) => {
        return actionService.loadByIds(ids);
      }),
      map((rows) => {
        const service = actionServiceRegistry(feature, entity);
        service.loadByIdsSuccess(rows);
      }),
    );
  };
}
