import { EntityState } from '@ngrx/entity';
import { take } from 'rxjs';

import { featureRegistry } from '../actions/has-feature.function';
import { assert } from '../common/assert.function';
import { forNext } from '../common/for-next.function';
import { actionServiceRegistry } from '../registrations/action.service.registry';
import { store } from '../selector/store.function';
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
  const actionService = actionServiceRegistry(feature, entity);
  assert(
    !!actionService,
    `the service for ${feature}:${entity} is not available`,
  );
  if (!featureRegistry.hasFeature(feature)) {
    return;
  }
  const selectEntities = (state: unknown) => {
    const featureState = (
      state as Record<string, Record<string, EntityState<T>>>
    )[feature];
    return featureState[entity].entities;
  };
  store()
    .select(selectEntities)
    .pipe(take(1))
    .subscribe((state) => {
      forNext(ids, (id) => {
        if (state[id] !== undefined) {
          actionService.forceDirty([id]);
        }
      });
    });
}
