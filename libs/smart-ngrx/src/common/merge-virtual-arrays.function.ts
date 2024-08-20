import { SmartNgRXRowBase } from "../types/smart-ngrx-row-base.interface";
import { VirtualArrayContents } from "../types/virtual-array-contents.interface";
import { forNext } from "./for-next.function";
import { psi } from "./psi.const";

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
  ///////////////////////////////////////////////
  // make sure code still works using modified new id before
  // trying to make the add work
  ///////////////////////////////////////////////
  //
  // let addRow: string | undefined;
  // if (existingArray.length > 0 &&
  //   existingArray.indexes[existingArray.length - 1] !== undefined &&
  //   existingArray.indexes[existingArray.length - 1].endsWith(`${psi}new-row`)
  // ) {
  //   addRow = existingArray.indexes[existingArray.length - 1];
  // }
  const mergedArray = [...existingArray.indexes];
  forNext(newArray.indexes, (item, index) => {
    if(item !== undefined) {
      mergedArray[index] = item;
    }
  });
  // if (addRow !== undefined) {
  //   mergedArray[newArray.length] =addRow;
  // }

  return {
    indexes: mergedArray,
    length: newArray.length, // + (addRow !== undefined ? 1 : 0),
  };
}
