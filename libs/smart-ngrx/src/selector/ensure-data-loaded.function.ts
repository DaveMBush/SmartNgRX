import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { assert } from '../common/assert.function';
import { zoneless } from '../common/zoneless.function';
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
 * @param action The action to dispatch if the id isn't loaded
 */
export function ensureDataLoaded<T extends MarkAndDelete>(
  entityState: EntityState<T>,
  id: string,
  action: (p: { ids: string[] }) => Action,
): void {
  const ids = entityState.entities as Record<string, T>;
  if (
    ids[id] === undefined ||
    ids[id].isDirty === true ||
    ids[id].isDirty === undefined
  ) {
    const s = store();
    assert(!!s, 'store is undefined');
    // too much trouble to pass Zone in so just going after
    // unpatched Promise directly.
    void unpatchedPromise.resolve().then(() => {
      // gets around the 'NG0600: Writing to signals is not allowed in a computed or an effect by default'
      s.dispatch(action({ ids: [id] }));
    });
  }
}