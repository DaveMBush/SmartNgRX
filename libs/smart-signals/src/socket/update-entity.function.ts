// jscpd:ignore-start
// similar to the code in ngrx version but enough
// different it needs to be its own code
import { Dictionary } from '@ngrx/entity';
import {
  entityRegistry,
  FacadeBase,
  facadeRegistry,
  featureRegistry,
  forNext,
  isNullOrUndefined,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';

import { SignalsFacade } from '../signal-facade/signals-facade';

/**
 * Use this function to update the rows represented by the ids for an entity in a feature in response
 * to a websocket event indicating the row has been updated.
 *
 * @param feature The feature the entity is in.
 * @param entity The entity to update.
 * @param ids The ids of the rows that need to be refreshed.
 */
export function updateEntity<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
  ids: string[],
): void {
  const actionService = facadeRegistry.register(feature, entity);
  if (!featureRegistry.hasFeature(feature)) {
    return;
  }
  const featureFacade = facadeRegistry.register(
    feature,
    entity,
  ) as SignalsFacade<T>;
  const entityMap = featureFacade.entityState.entityMap();
  forceEntitiesDirty(ids, actionService)(entityMap);
}

function forceEntitiesDirty<T extends SmartNgRXRowBase>(
  ids: string[],
  actionService: FacadeBase<T>,
): (state: Dictionary<T>) => void {
  return function innerForceEntitiesDirty(state: Dictionary<T>) {
    forNext(ids, forceIdDirty(state, actionService));
  };
}

function forceIdDirty<T extends SmartNgRXRowBase>(
  state: Dictionary<T>,
  actionService: FacadeBase<T>,
): (id: string) => void {
  const registry = entityRegistry.get(
    actionService.feature,
    actionService.entity,
  );
  const markDirtyFetchesNew = !(
    isNullOrUndefined(registry.markAndDeleteInit.markDirtyFetchesNew) ||
    !registry.markAndDeleteInit.markDirtyFetchesNew
  );
  return function innerForceIdDirty(id: string) {
    if (markDirtyFetchesNew && state[id] !== undefined) {
      actionService.loadByIds(id);
    }
    if (state[id] !== undefined) {
      actionService.forceDirty([id]);
    }
  };
}
// jscpd:ignore-end
