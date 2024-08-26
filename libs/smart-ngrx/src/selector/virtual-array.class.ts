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
          if (this.rawArray[+prop]) {
            return this.rawArray[+prop];
          }
          store().dispatch(
            this.parentAction.loadByIndexes({
              indexes: [+prop],
              parentId,
              childField,
            }),
          );
          return `index-${prop}`;
        }
        return Reflect.get(target, prop);
      },
    });
  }

  [key: number]: C;
}
