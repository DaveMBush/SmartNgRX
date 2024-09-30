import { EntityState } from '@ngrx/entity';
import { take } from 'rxjs';

import { ActionService } from '../actions/action.service';
import { forNext } from '../common/for-next.function';
import { store } from '../selector/store.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { actionServiceRegistry } from '../registrations/action.service.registry';
import { assert } from '../common/assert.function';

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
  // check for feature/entities the long way to avoid triggering warnings
  // there is also no good reason to memoize the result
  const selectEntities = (state: unknown) => {
    const featureState = ((state as Record<string, unknown>)[feature] ??
      {}) as Record<string, EntityState<T>>;
    return featureState[entity]?.entities ?? {};
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
