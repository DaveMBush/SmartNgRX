import { SmartNgRXRowBase } from "../types/smart-ngrx-row-base.interface";
import { VirtualArrayContents } from "../types/virtual-array-contents.interface";
import { forNext } from "./for-next.function";

/**
 * Merges the new array into the existing array
 *
 * @param newArray the new array
 * @param existingArray the existing array
 * @returns the merged array
 */
export function mergeVirtualArrays<T extends SmartNgRXRowBase>(
  newArray: VirtualArrayContents,
  existingArray: VirtualArrayContents
): VirtualArrayContents {
  const mergedArray = [...existingArray.indexes];
  forNext(newArray.indexes, (item, index) => {
    if(item !== undefined) {
      mergedArray[index] = item;
    }
  });
  return {
    indexes: mergedArray,
    length: newArray.length,
  };
}
