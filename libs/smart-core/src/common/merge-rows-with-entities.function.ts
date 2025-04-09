import { Dictionary } from '@ngrx/entity';

import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { forNext } from './for-next.function';
import { mergeNewRowWithExisting } from './merge-new-row-with-existing.function';

/**
 * Merges rows with existing entities to preserve virtual array data
 *
 * @param feature the name of the feature the rows represent
 * @param entity the name of the entity the rows represent
 * @param rows rows to merge
 * @param entities existing entities to merge with
 * @returns merged rows
 */
export function mergeRowsWithEntities<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
  rows: T[],
  entities: Dictionary<SmartNgRXRowBase>,
): T[] {
  forNext(rows, function mergeRowsWithEntitiesForNextRow(row) {
    const existingRow = entities[row.id];
    if (existingRow !== undefined) {
      row = mergeNewRowWithExisting(
        feature,
        entity,
        row,
        existingRow as Record<keyof T, unknown> & T,
      );
    }
  });
  return rows;
}
