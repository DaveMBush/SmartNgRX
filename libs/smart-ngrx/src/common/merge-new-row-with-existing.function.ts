import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { forNext } from './for-next.function';
import { mergeVirtualArrays } from './merge-virtual-arrays.function';

/**
 * Merges the new row with the existing row keeping the virtual array
 * data in place if it is in the existing row.
 *
 * @param newRow new row to merge
 * @param existingRow existing row to merge with
 * @returns merged row
 */
export function mergeNewRowWithExisting<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
  newRow: Record<keyof T, unknown> & T,
  existingRow: Record<keyof T, unknown> & SmartNgRXRowBase
): T {

  const mergedRow = newRow as Record<keyof T, VirtualArrayContents>;
  forNext(Object.keys(newRow) as (keyof T)[] , (key) => {
    const value = newRow[key] as VirtualArrayContents;
    if (!isVirtualArray(value)) {
      return;
    }
    const existingArray = existingRow[key] as VirtualArrayContents;
    // Preserve virtual array data
    mergedRow[key] = mergeVirtualArrays(
      feature,
      entity,
      value,
      existingArray
    );
  });

  return mergedRow as T;
}


/**
 * Type guard to check if an item is a VirtualArrayContents
 *
 * @param item The item to check
 * @returns True if the item is a VirtualArrayContents, false otherwise
 */
export function isVirtualArray(item: unknown): item is VirtualArrayContents {
  return (
    typeof item === 'object' &&
    item !== null &&
    'indexes' in item &&
    Array.isArray((item as VirtualArrayContents).indexes)
  );
}


