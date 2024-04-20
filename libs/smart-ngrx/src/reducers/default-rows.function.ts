import { Dictionary } from '@ngrx/entity';

import { forNext } from '../common/for-next.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

/**
 * Filters out the rows we already have and provides a default row
 * for the ones we don't have.
 *
 * @param ids The ids to check
 * @param entities The Dictionary of rows
 * @param defaultRow The defaultRow function to use to
 * create a new row for the ids that are missing.
 * @returns The default rows for the ids that are missing
 */
export function defaultRows<T extends SmartNgRXRowBase>(
  ids: string[],
  entities: Dictionary<T> | undefined,
  defaultRow: (id: string) => T,
): T[] {
  const t: T[] = [];
  forNext(ids, (id) => {
    if (entities?.[id] !== undefined) {
      return;
    }
    const row: T = defaultRow(id);
    row.isLoading = true;
    t.push(row);
  });
  return t;
}
