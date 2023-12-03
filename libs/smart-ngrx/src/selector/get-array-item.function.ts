import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { IdsProp } from '../types/ids-prop.interface';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ensureDataLoaded } from './ensure-data-loaded.function';
import { realOrMocked } from './real-or-mocked.function';

/**
 * Internal function used by `createInnerSmartSelector` use to load the data if
 * it doesn't exist in the store and return a placeholder row if it doesn't
 * exist.
 *
 * @param entityState The entity to check for the id
 * @param id The id to check
 * @param action The action to dispatch if the id isn't loaded
 * @param mockRow The row to return if the row for the id doesn't exist
 * @returns real or placeholder row
 */
export function getArrayItem<T extends MarkAndDelete>(
  entityState: EntityState<T>,
  id: string,
  action: (p: IdsProp) => Action,
  mockRow: T,
): T {
  ensureDataLoaded(entityState, id, action);
  return realOrMocked(entityState, id, mockRow);
}
