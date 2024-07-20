import { SmartNgRXRowBase } from "../types/smart-ngrx-row-base.interface";
import { SmartArray } from "./smart-array.interface";

/**
 * Class that represents an array that is not fully loaded
 * from the server but loads the data as it is needed.
 */
export class VirtualArray<P extends object, C extends SmartNgRXRowBase = SmartNgRXRowBase> implements SmartArray<P, C> {
  rawArray: string[] = [];
  /**
   * The constructor of the virtual array that takes the length of the array
   * as a parameter.
   *
   * @param length The length of the array
   */
  constructor(public length: number) {
    this.rawArray.length = length;
  }

  [key: number]: C;
}
