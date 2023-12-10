import { EntityState } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { zoneless } from '../common/zoneless.function';
import { actionFactory } from '../functions/action.factory';
import { getEntityRegistry } from '../functions/register-entity.function';
import { registerEntityRows } from '../mark-and-delete/register-entity-rows.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { store } from './store.function';

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
  T extends MarkAndDelete,
  F extends string,
  E extends string,
>(
  entityState: EntityState<T>,
  id: string,
  feature: StringLiteralSource<F>,
  entity: StringLiteralSource<E>,
): void {
  const registry = getEntityRegistry(feature, entity);
  const actions = actionFactory(feature, entity);
  const ids = entityState.entities as Record<string, T>;
  const markDirtyFetchesNew = !(
    isNullOrUndefined(registry.markAndDeleteInit.markDirtyFetchesNew) ||
    !registry.markAndDeleteInit.markDirtyFetchesNew
  );

  if (
    ids[id] === undefined ||
    (ids[id].isDirty === true && markDirtyFetchesNew) ||
    ids[id].isDirty === undefined
  ) {
    const s = store();
    assert(!!s, 'store is undefined');
    // too much trouble to pass Zone in so just going after
    // unpatched Promise directly.
    void unpatchedPromise.resolve().then(() => {
      // gets around the 'NG0600: Writing to signals is not allowed in a computed or an effect by default'
      s.dispatch(actions.loadByIds({ ids: [id] }));
    });
  } else if (ids[id].isDirty === true && !markDirtyFetchesNew) {
    registerEntityRows(feature, entity, [ids[id]]);
  }
}
