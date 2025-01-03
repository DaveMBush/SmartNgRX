import { EntityState } from '@ngrx/entity';

import { ActionService } from '../actions/action.service';
import { zoneless } from '../common/zoneless.function';
import { actionServiceRegistry } from '../registrations/action-service-registry.class';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

const unpatchedPromise = zoneless('Promise') as typeof Promise;

/**
 * Internal function that ensures that the ID is loaded
 * into the store for the entity by dispatching the
 * action if it isn't.
 *
 * @param entityState The entity to check for the id
 * @param id The id to check for
 * @param feature The feature this row belongs to
 * @param entity The entity in the feature this row belongs to
 */
export function ensureDataLoaded<T extends SmartNgRXRowBase>(
  entityState: EntityState<T>,
  id: string,
  feature: string,
  entity: string,
): void {
  const actionService = actionServiceRegistry.register(feature, entity);
  const ids = entityState.entities as Record<string, T>;

  const idsId = ids[id];

  if (
    idsId === undefined ||
    idsId.isDirty === true ||
    idsId.isDirty === undefined
  ) {
    // too much trouble to pass Zone in so just going after
    // unpatched Promise directly.
    // gets around the 'NG0600: Writing to signals is not allowed in a computed or an effect by default'
    void unpatchedPromise
      .resolve()
      .then(actionServiceLoadByIds(actionService, id));
  }
}

function actionServiceLoadByIds(actionService: ActionService, id: string) {
  return function internalActionServiceLoadByIds() {
    actionService.loadByIds(id);
  };
}
