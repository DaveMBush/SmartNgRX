import { Dictionary } from '@ngrx/entity';

import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { forNext } from './for-next.function';
import { mergeNewRowWithExisting } from './merge-new-row-with-existing.function';
import { psi } from './psi.const';

/**
 * Merges rows with existing entities to preserve virtual array data
 *
 * @param rows rows to merge
 * @param entities existing entities to merge with
 * @returns merged rows
 */
export function mergeRowsWithEntities<T extends SmartNgRXRowBase>(
  rows: T[],
  entities: Dictionary<SmartNgRXRowBase>
): T[] {
  forNext(rows, (row) => {
    const existingRow = entities[row.id];
    if (existingRow !== undefined) {
      row = mergeNewRowWithExisting(row, existingRow as Record<keyof T, unknown> & T);
    }
  });
  return rows;
}
