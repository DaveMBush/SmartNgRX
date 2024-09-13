import { ActionGroup } from '../actions/action-group.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { SmartArray } from './smart-array.interface';
import { store } from './store.function';

/**
 * Class that represents an array that is not fully loaded
 * from the server but loads the data as it is needed.
 */
export class VirtualArray<
  P extends object,
  C extends SmartNgRXRowBase = SmartNgRXRowBase,
> implements SmartArray<P, C>
{
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

  private dispatchLoadByIndexes(
    parentAction: ActionGroup,
    parentId: string,
    childField: string,
    index: number,
  ) {
    // I need to preserve fetchedIndexes when I recreate the VirtualArray class
    // like I do for the rawArray.
    // Can I retrieve it from the store as I'm replacing it?
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
