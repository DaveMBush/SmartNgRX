import { EntityState } from '@ngrx/entity';

import { MarkAndDelete } from '../types/mark-and-delete.interface';

/**
 * Filters out the rows we already have and provides a default row
 * for the ones we don't have.
 * @param ids The ids to check
 * @param state The current state to check ids against
 * @param defaultRow The defaultRow function to use to
 * create a new row for the ids that are missing.
 * @returns The default rows for the ids that are missing
 */
export function defaultRows<T extends MarkAndDelete>(
  ids: string[],
  state: EntityState<T>,
  defaultRow: (id: string) => T,
): T[] {
  return ids
    .filter((id) => state.entities[id] === undefined)
    .map((id) => defaultRow(id));
}
