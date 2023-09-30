import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { asapScheduler } from 'rxjs';

import { assert } from '../common/assert.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { store } from './store.function';

/**
 * Makes sure that the ID is loaded into the store for the entity
 * @param entityState
 * @param id
 * @param action
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
    // gets around the 'NG0600: Writing to signals is not allowed in a computed or an effect by default'
    asapScheduler.schedule(() => s.dispatch(action({ ids: [id] })));
  }
}
