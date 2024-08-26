import { newRowRegistry } from '../selector/new-row-registry.class';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { forNext } from './for-next.function';

/**
 * Merges the new array into the existing array
 *
 * @param feature the name of the feature the arrays are pointing to
 * @param entity the name of the entity the arrays are pointing to
 * @param newArray the new array
 * @param existingArray the existing array
 * @returns the merged array
 */
export function mergeVirtualArrays(
  feature: string,
  entity: string,
  newArray: VirtualArrayContents,
  existingArray: VirtualArrayContents,
): VirtualArrayContents {
  let addRow: string | undefined;
  if (
    existingArray.length > 0 &&
    newRowRegistry.isNewRow(
      feature,
      entity,
      existingArray.indexes[existingArray.length - 1],
    )
  ) {
    addRow = existingArray.indexes[existingArray.length - 1];
  }
  const mergedArray = [...existingArray.indexes];
  forNext(newArray.indexes, (item, index) => {
    if (item !== undefined) {
      mergedArray[index] = item;
    }
  });
  if (addRow !== undefined) {
    mergedArray[newArray.length] = addRow;
  }

  return {
    indexes: mergedArray,
    length: newArray.length + (addRow !== undefined ? 1 : 0),
  };
}
