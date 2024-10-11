import { newRowRegistry } from '../selector/new-row-registry.class';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { forNext } from './for-next.function';
import { itemIsMarkedForDeletion } from './item-is-marked-for-deletion.function';

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
  if (existingArray.indexes === undefined) {
    return newArray;
  }
  if (
    existingArray.length > 0 &&
    newRowRegistry.isNewRow(
      feature,
      entity,
      existingArray.indexes[existingArray.length - 1],
    ) &&
    newArray.indexes.length >= existingArray.length - 1 &&
    newArray.indexes[existingArray.length - 1] !== 'delete'
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
  const hasDeleted = mergedArray.some(itemIsMarkedForDeletion);
  const length =
    newArray.length + (addRow !== undefined ? 1 : 0) - (hasDeleted ? 1 : 0);
  return {
    indexes: hasDeleted
      ? mergedArray.filter((item) => !itemIsMarkedForDeletion(item))
      : mergedArray,
    length,
  };
}
