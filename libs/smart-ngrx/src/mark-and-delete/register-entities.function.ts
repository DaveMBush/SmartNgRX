import { createEntityAdapter } from '@ngrx/entity';

import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { getMarkAndDeleteFeatureMap } from './mark-and-delete.map';

/**
 * registers the rows with the mark and delete functionality.
 * @param key the main feature/entity key to use to lookup the markAndDelete map
 * @param feature
 * @param entity
 * @param rows the rows to register with the mark and delete functionality
 * @returns the rows that were passed in with the `isDirty` flag set to false
 */
export function registerEntities<T extends MarkAndDelete>(
  feature: string,
  entity: string,
  rows: T[],
): T[] {
  const adapter = createEntityAdapter<T>();
  return rows.map((row) => {
    const markAndDeleteMap = getMarkAndDeleteFeatureMap(feature);
    const markAndDeleteKey = `${entity}θ${adapter.selectId(row)}`;
    markAndDeleteMap.delete(markAndDeleteKey);
    markAndDeleteMap.set(markAndDeleteKey, Date.now());
    // this is getting called from a reducer so we can't mutate the existing row
    return { ...row, isDirty: false };
  });
}

/**
 * unregisters the rows with the mark and delete functionality.
 * @param feature the feature the ids belong to
 * @param entity the entity the ids belong to
 * @param ids the ids to unregister with the mark and delete functionality
 * @returns the ids that were passed in
 */
export function unregisterEntities(
  feature: string,
  entity: string,
  ids: string[],
): string[] {
  const markAndDeleteMap = getMarkAndDeleteFeatureMap(`${feature}:${entity}`);
  return ids.map((id) => {
    const markAndDeleteKey = `${entity}-${id}`;
    markAndDeleteMap.delete(markAndDeleteKey);
    return id;
  });
}
