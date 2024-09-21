import { ActionGroup } from '../actions/action-group.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { store } from './store.function';

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
   * @param parentAction the parent's action group
   * @param parentId the id of the parent row
   * @param childField the fieldName in the parent row that holds the children for this array
   */
  constructor(
    public array: VirtualArrayContents,
    private parentAction: ActionGroup,
    parentId: string,
    childField: string,
  ) {
    this.rawArray = array.indexes;
    this.length = array.length;
    return new Proxy(this, {
      get: (target: VirtualArray<P, C>, prop: string | symbol): unknown => {
        if (typeof prop === 'string' && !Number.isNaN(+prop)) {
          this.dispatchLoadByIndexes(
            this.parentAction,
            parentId,
            childField,
            +prop,
          );
          if (this.rawArray[+prop]) {
            return this.rawArray[+prop];
          }
          if (Object.isFrozen(this.rawArray)) {
            this.rawArray = [...this.rawArray];
          }
          this.rawArray[+prop] = `indexNoOp-${prop}`;
          return `index-${prop}`;
        }
        return Reflect.get(target, prop);
      },
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
  getIdAtIndex(index: number): string {
    if (this.rawArray[index] !== undefined) {
      return this.rawArray[index];
    }
    return `index-${index}`;
  }

  private dispatchLoadByIndexes(
    parentAction: ActionGroup,
    parentId: string,
    childField: string,
    index: number,
  ) {
    if (this.fetchedIndexes[index]) {
      return;
    }
    store().dispatch(
      parentAction.loadByIndexes({
        indexes: [index],
        parentId,
        childField,
      }),
    );
    if (Object.isFrozen(this.fetchedIndexes)) {
      this.fetchedIndexes = [...this.fetchedIndexes];
    }
    this.fetchedIndexes[index] = true;
  }

  [key: number]: C;
}
