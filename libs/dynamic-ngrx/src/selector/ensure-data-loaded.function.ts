import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { assert } from '../common/assert.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { store } from './store.function';

export function ensureDataLoaded<T extends MarkAndDelete>(
  entityState: EntityState<T>,
  id: string,
  action: (p: { ids: string[] }) => Action
): void {
  const workspaceIds = entityState.entities as Record<string, T>;
  if (workspaceIds[id]?.isDirty ?? true) {
    const s = store();
    assert(!!s, 'store is undefined');
    s.dispatch(action({ ids: [id] }));
  }
}
