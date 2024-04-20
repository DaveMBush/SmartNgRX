import { EntityState } from '@ngrx/entity';

import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { zoneless } from '../common/zoneless.function';
import { registerEntityRows } from '../mark-and-delete/register-entity-rows.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { actionServiceRegistry } from '../registrations/action.service.registry';
import { getEntityRegistry } from '../registrations/register-entity.function';
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
export function ensureDataLoaded<
  T extends SmartNgRXRowBase,
  F extends string,
  E extends string,
>(
  entityState: EntityState<T>,
  id: string,
  feature: StringLiteralSource<F>,
  entity: StringLiteralSource<E>,
): void {
  const actionService = actionServiceRegistry(
    feature as StringLiteralSource<string>,
    entity as StringLiteralSource<string>,
  );
  const registry = getEntityRegistry(feature, entity);
  const ids = entityState.entities as Record<string, T>;
  const markDirtyFetchesNew = !(
    isNullOrUndefined(registry.markAndDeleteInit.markDirtyFetchesNew) ||
    !registry.markAndDeleteInit.markDirtyFetchesNew
  );

  const idsId = ids[id];

  if (
    idsId === undefined ||
    (idsId.isDirty === true && markDirtyFetchesNew) ||
    idsId.isDirty === undefined
  ) {
    // too much trouble to pass Zone in so just going after
    // unpatched Promise directly.
    // gets around the 'NG0600: Writing to signals is not allowed in a computed or an effect by default'
    void unpatchedPromise.resolve().then(() => {
      actionService.loadByIds([id]);
    });
  } else if (idsId.isDirty && !markDirtyFetchesNew) {
    registerEntityRows(feature, entity, [idsId]);
    void unpatchedPromise.resolve().then(() => {
      actionService.markDirty([id]);
    });
  }
}
