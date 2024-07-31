import { SmartNgRXRowBase } from "../types/smart-ngrx-row-base.interface";
import { SmartArray } from "./smart-array.interface";
import { store } from "./store.function";

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
    return new Proxy(this, {
      get: (target: VirtualArray<P,C>, prop: string | symbol): unknown => {
        if (typeof prop === 'string' && !isNaN(+prop)) {
          if (this.rawArray[+prop]) {
            return this.rawArray[+prop];
          }
          store().dispatch(this.childAction.loadByIndex(+prop));
          return `index-${prop}`;
        }
        return Reflect.get(target, prop);
      },
    });
  }

  [key: number]: C;
}
