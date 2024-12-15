import { ActionService } from '../actions/action.service';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';

/**
 * Class that represents an array that is not fully loaded
 * from the server but loads the data as it is needed.
 */
export class VirtualArray<
  P extends object,
  C extends SmartNgRXRowBase = SmartNgRXRowBase,
> {
  rawArray: string[] = [];
  fetchedIndexes: boolean[] = [];
  length = 0;

  /**
   * The constructor of the virtual array that takes the length of the array
   * as a parameter.
   *
   * @param array array that contains the available IDs
   * @param parentActionService the action service of the parent row
   * @param parentId the id of the parent row
   * @param childField the fieldName in the parent row that holds the children for this array
   */
  constructor(
    public array: VirtualArrayContents,
    private parentActionService: ActionService<SmartNgRXRowBase>,
    parentId: string,
    childField: string,
  ) {
    this.rawArray = array.indexes;
    this.length = array.length;
    return new Proxy(this, {
      get: proxyGetVirtualArray<P, C>(parentId, childField),
    });
  }

  /**
   * Tells the virtual array to refetch the indexes the next
   * time an element is requested.
   */
  refetchIndexes(): void {
    this.fetchedIndexes = [];
  }

  /**
   * returns the id at the given index without fetching
   * the id from the server. if the id does not exist,
   * an ID based on the index is returned.
   *
   * @param index the index to get the id at
   * @returns the id at the given index
   */
  getIdAtIndex(index: number): string | undefined {
    if (index >= 0 && index < this.length) {
      if (this.rawArray[index] !== undefined) {
        return this.rawArray[index];
      }
      return `index-${index}`;
    }
    return undefined;
  }

  /**
   * This is used internally by the Proxy get handler
   *
   * @param parentId the id of the parent row
   * @param childField the fieldName in the parent row that holds the children for this array
   * @param index the index to load
   */
  dispatchLoadByIndexes(parentId: string, childField: string, index: number) {
    this.parentActionService.loadByIndexes(parentId, childField, [index]);
    if (Object.isFrozen(this.fetchedIndexes)) {
      this.fetchedIndexes = [...this.fetchedIndexes];
    }
    this.fetchedIndexes[index] = true;
  }

  [key: number]: C;
}

function proxyGetVirtualArray<P extends object, C extends SmartNgRXRowBase>(
  parentId: string,
  childField: string,
) {
  return function innerProxyGetVirtualArray(
    target: VirtualArray<P, C>,
    prop: string | symbol,
  ): unknown {
    if (typeof prop === 'string' && !Number.isNaN(+prop)) {
      if (target.rawArray[+prop]) {
        return target.rawArray[+prop];
      }
      // don't modify rawArray until after we've dispatched the action.
      target.dispatchLoadByIndexes(parentId, childField, +prop);
      if (Object.isFrozen(target.rawArray)) {
        target.rawArray = [...target.rawArray];
      }
      target.rawArray[+prop] = `indexNoOp-${prop}`;
      return `index-${prop}`;
    }
    return Reflect.get(target, prop);
  };
}
