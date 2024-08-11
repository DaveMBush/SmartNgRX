import { inject, NgZone } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import { ActionGroup } from '../../actions/action-group.interface';
import { actionServiceRegistry } from '../../registrations/action.service.registry';
import { entityDefinitionCache } from '../../registrations/entity-definition-cache.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { bufferIndexesAction } from '../buffer-indexes-action.function';

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
  return (
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    effectService = inject(effectServiceToken),
    /* istanbul ignore next -- default value, not really a condition */
    zone: NgZone = inject(NgZone),
  ) => {
    return actions$.pipe(
      ofType(actions.loadByIndexes),
      // we need to pass down the parentId and childField as
      // part of the action props so we will need a new
      // buffer action to handle this. This also means we
      // will need to group the buffer by parentId and childField
      // (I've already changed the action to include these)
      bufferIndexesAction(zone),
      mergeMap((actionProps) => {
        // we need to strip out the index- prefix on the ids,
        // convert them to numbers and then get the min/max values
        // instead of assuming the first will be the min and the first
        // plus the length will be the max
        // (I've already change the action so that ids is an array of numbers)
        const numberIds = actionProps.indexes.map((id) => +id);
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
              map((indexes) =>
                actionServiceRegistry(feature, entity).loadByIndexesSuccess(
                  actionProps.parentId,
                  actionProps.childField,
                  indexes,
                ),
              ),
            )
        );
      }),
    );
  };
}
