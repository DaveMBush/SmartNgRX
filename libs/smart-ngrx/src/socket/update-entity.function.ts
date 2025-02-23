import { Dictionary, EntityState } from '@ngrx/entity';
import { take } from 'rxjs';

import { forNext } from '../common/for-next.function';
import { FacadeBase } from '../facades/facade.base';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { store } from '../smart-selector/store.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

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
  function selectEntities(state: unknown) {
    const featureState = (
      state as Record<string, Record<string, EntityState<T>>>
    )[feature];
    return featureState[entity].entities;
  }
  store()
    .select(selectEntities)
    .pipe(take(1))
    .subscribe(forceEntitiesDirty(ids, actionService));
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
  return function innerForceIdDirty(id: string) {
    if (state[id] !== undefined) {
      actionService.forceDirty([id]);
    }
  };
}
