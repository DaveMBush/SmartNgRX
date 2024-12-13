import { inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { assert } from '../../common/assert.function';
import { actionServiceRegistry } from '../../registrations/action-service-registry.class';
import { entityDefinitionCache } from '../../registrations/entity-definition-cache.function';
import { EffectServiceToken } from '../../types/effect-service.token';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';

/**
 * This is the effect that loads the ids from the service.
 *
 * @param actions the action group for the source provided
 * @param feature the feature name this effect is being run for
 * @param entity the entity within the feature this effect is being run for
 * @returns the loadByIds effect
 */
export function loadByIndexesEffect<T extends SmartNgRXRowBase>(
  actions: ActionGroup<T>,
  feature: string,
  entity: string,
) {
  const effectServiceToken = entityDefinitionCache(
    feature,
    entity,
  ).effectServiceToken;
  return loadByIndexesEffectFunction<T>(
    feature,
    entity,
    actions,
    effectServiceToken,
  );
}

function loadByIndexesEffectFunction<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
  actions: ActionGroup<T>,
  effectServiceToken: EffectServiceToken<SmartNgRXRowBase>,
) {
  return function loadByIndexesEffectFunctionInner(
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    effectService = inject(effectServiceToken),
  ) {
    return actions$.pipe(
      ofType(actions.loadByIndexes),
      mergeMap(function loadByIndexesEffectMergeMap(actionProps) {
        const numberIds = actionProps.indexes.map(
          function convertStringToNumber(id) {
            return +id;
          },
        );
        const min = Math.min(...numberIds);
        const max = Math.max(...numberIds);
        return (
          effectService
            .loadByIndexes(
              actionProps.parentId,
              actionProps.childField,
              min,
              max - min + 1,
            )
            // nested pipe to get access to actionProps
            .pipe(
              map(function loadByIndexesEffectMapItem(indexes) {
                const actionService = actionServiceRegistry.register(
                  feature,
                  entity,
                );
                assert(
                  !!actionService,
                  `the service for ${feature}:${entity} is not available`,
                );
                actionService.loadByIndexesSuccess(
                  actionProps.parentId,
                  actionProps.childField,
                  indexes,
                );
              }),
            )
        );
      }),
    );
  };
}
