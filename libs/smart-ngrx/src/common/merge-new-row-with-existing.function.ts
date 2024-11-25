import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { forNext } from './for-next.function';
import { isVirtualArrayContents } from './is-virtual-array-contents.function';
import { mergeVirtualArrays } from './merge-virtual-arrays.function';

/**
 * Merges the new row with the existing row keeping the virtual array
 * data in place if it is in the existing row.
 *
 * @param feature the name of the feature the row represent
 * @param entity the name of the entity the row represent
 * @param newRow new row to merge
 * @param existingRow existing row to merge with
 * @returns merged row
 */
export function mergeNewRowWithExisting<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
  newRow: Record<keyof T, unknown> & T,
  existingRow: Record<keyof T, unknown> & SmartNgRXRowBase,
): T {
  const mergedRow = newRow as Record<keyof T, VirtualArrayContents>;
  forNext(
    Object.keys(newRow) as (keyof T)[],
    function mergeNewRowWithExistingForNextKey(key) {
      const value = newRow[key] as VirtualArrayContents;
      if (!isVirtualArrayContents(value)) {
        return;
      }
      const existingArray = existingRow[key] as VirtualArrayContents;
      // Preserve virtual array data
      mergedRow[key] = mergeVirtualArrays(
        feature,
        entity,
        value,
        existingArray,
      );
    },
  );

  return mergedRow as T;
}
