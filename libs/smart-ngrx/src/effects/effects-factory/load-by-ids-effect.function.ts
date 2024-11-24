import { inject, InjectionToken } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, Observable } from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { assert } from '../../common/assert.function';
import { actionServiceRegistry } from '../../registrations/action.service.registry';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
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
  feature: string,
  entity: string,
) {
  return function loadByIdsEffectFunction(
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    effectService = inject(effectServiceToken),
  ) {
    return actions$.pipe(
      ofType(actions.loadByIds),
      map(function actionToActionId(action) {
        return action.ids;
      }),
      filter(function filterOutIdsWithZeroLength(ids) {
        return ids.length > 0;
      }),
      mergeMap(function loadByIdsEffectMergeMap(ids): Observable<T[]> {
        const actionService = actionServiceRegistry(feature, entity);
        assert(
          !!actionService,
          `the service for ${feature}:${entity} is not available`,
        );
        actionService.loadByIdsPreload(ids);
        return effectService.loadByIds(ids);
      }),
      map(function loadByIdsEffectMapRow(rows) {
        const service = actionServiceRegistry(feature, entity);
        assert(
          !!service,
          `the service for ${feature}:${entity} is not available`,
        );
        service.loadByIdsSuccess(rows);
      }),
    );
  };
}
