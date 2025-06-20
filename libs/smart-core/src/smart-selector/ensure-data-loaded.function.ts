import { EntityState } from '@ngrx/entity';

import { entityRegistry, entityRowsRegistry, isNullOrUndefined } from '..';
import { zoneless } from '../common/zoneless.function';
import { FacadeBase } from '../facades/facade.base';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

let unpatchedPromise: typeof Promise | undefined;

function getUnpatchedPromise(): typeof Promise {
  /* istanbul ignore next -- difficult to test */
  if (unpatchedPromise === undefined) {
    unpatchedPromise = zoneless('Promise') as typeof Promise;
  }
  return unpatchedPromise;
}

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
  const promise = getUnpatchedPromise();
  /* istanbul ignore next -- difficult to test */
  if (promise === undefined) {
    // if we can't get the unpatched promise it is probably
    // because we are in SSR mode
    /* istanbul ignore if -- difficult to test */
    return;
  }
  const actionService = facadeRegistry.register(feature, entity);
  const ids = entityState.entities as Record<string, T>;

  const idsId = ids[id];
  const registry = entityRegistry.get(feature, entity);
  const markDirtyFetchesNew = !(
    isNullOrUndefined(registry.markAndDeleteInit.markDirtyFetchesNew) ||
    !registry.markAndDeleteInit.markDirtyFetchesNew
  );
  /* istanbul ignore next  -- can't test ?. */
  const isUndefinedOrDirty = idsId?.isDirty === undefined || idsId?.isDirty;
  const isDirtyAndShouldNotFetch =
    idsId?.isDirty === true && markDirtyFetchesNew;

  if (isDirtyAndShouldNotFetch) {
    entityRowsRegistry.register(feature, entity, [idsId]);
    void promise.resolve().then(function actionServiceMarkNotDirty() {
      actionService.markNotDirty(id);
    });
  } else if (isUndefinedOrDirty) {
    // too much trouble to pass Zone in so just going after
    // unpatched Promise directly.
    // gets around the 'NG0600: Writing to signals is not allowed in a computed or an effect by default'
    void promise.resolve().then(actionServiceLoadByIds(actionService, id));
  }
}

function actionServiceLoadByIds(actionService: FacadeBase, id: string) {
  return function internalActionServiceLoadByIds() {
    actionService.loadByIds(id);
  };
}
