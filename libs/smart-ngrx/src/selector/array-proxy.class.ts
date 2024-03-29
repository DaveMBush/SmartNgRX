import { EntityAdapter, EntityState } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { actionFactory } from '../functions/action.factory';
import { ActionGroup } from '../functions/action-group.interface';
import { adapterForEntity } from '../functions/adapter-for-entity.function';
import { CustomProxy } from '../row-proxy/custom-proxy.class';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { getArrayItem } from './get-array-item.function';
import { isArrayProxy } from './is-array-proxy.function';
import { store as storeFunction } from './store.function';

/**
 * This is an internal class used by `createSmartSelector` to wrap the field
 * that represents the child array with a class that manages all the
 * magic of loading the data from the server as it is accessed.
 *
 * @see `createSmartSelector`
 */
export class ArrayProxy<P extends object, C extends SmartNgRXRowBase>
  implements ArrayLike<C>
{
  entityAdapter: EntityAdapter<C>;
  [isProxy] = true;
  rawArray: string[] = [];

  /**
   * The constructor for the ArrayProxy class.
   *
   * @param childArray The array of ids to wrap
   * @param child The child entity we use to find the item in the store
   * @param childDefinition The definition of the child that allows us
   *     to get at features, entities and other things we need.
   */
  constructor(
    private childArray: ArrayProxy<P, C> | string[],
    private child: EntityState<C>,
    private childDefinition: ChildDefinition<P>,
  ) {
    const { childFeature, childEntity } = this.childDefinition;
    // needed primarily for adding items to the array
    this.entityAdapter = adapterForEntity<C>(childFeature, childEntity);
    // proxying this so that we can intercept going after
    // an index and return the item from the store instead
    return new Proxy(this, {
      get(target, prop) {
        if (typeof prop === 'string' && !isNaN(+prop)) {
          return target.getAtIndex(+prop);
        }
        return Reflect.get(target, prop);
      },
    });
  }

  /**
   * This initialized the class once it has been created. We do this
   * so that we can test the class without having to worry about
   * executable code in the constructor.
   */
  init(): void {
    // fill childArray with values from entity that we currently have
    if (isArrayProxy<P, C>(this.childArray)) {
      this.childArray = castTo<ArrayProxy<P, C>>(this.childArray).rawArray;
    }
    // at this point, we can be sure that childArray is a string[]
    if (Object.isFrozen(this.childArray)) {
      // unfreeze the original array so we can proxy it.
      this.childArray = [...this.childArray];
    }

    this.rawArray = this.childArray;
    this.childArray = [];
    this.length = this.rawArray.length;
  }

  /**
   * This primarily exist for testing so you can stringify the array and then
   * parse it so that you get an array you can compare against instead of an
   * object of type ArrayProxy that you can't do much with.
   *
   * @returns what this would return if it were a real array.  Mostly for
   * unit testing.
   */
  toJSON(): C[] {
    const array: C[] = [];
    for (let i = 0; i < this.length; i++) {
      array.push(this.getAtIndex(i));
    }
    return array;
  }

  [n: number]: C;
  length = 0;

  /**
   * Allows us to go after the data in the store based on the index of the
   * array.
   *
   * @param index the index into the rawArray that has the ID we will
   * lookup in the entity.
   * @returns the item from the store or the default row if it is not in the
   * store yet.
   */
  getAtIndex(index: number): C {
    if (index >= 0 && index < this.rawArray.length) {
      const id = this.rawArray[index];
      return getArrayItem<C, P>(this.child, id, this.childDefinition);
    }
    throw new Error('Index out of bounds');
  }

  /**
   * grabs common actions and store used by other methods
   *
   * @returns actions, parentActions, and store
   */
  getActionsAndStore(): {
    actions: ActionGroup<SmartNgRXRowBase>;
    parentActions: ActionGroup<SmartNgRXRowBase>;
    store: Store;
  } {
    const { childFeature, childEntity, parentFeature, parentEntity } =
      this.childDefinition;
    const actions = actionFactory(childFeature, childEntity);
    const parentActions = actionFactory(parentFeature, parentEntity);
    const store = storeFunction();
    assert(!!store, 'store is undefined');
    return { actions, parentActions, store };
  }

  /**
   * This method allows us to add an item to the array. Make sure it contains
   * and ID field and any other defaults you might need
   *
   * @param newRow the item to add to the array
   * @param thisRow the parent entity (this row) that contains the array
   */
  addToStore(newRow: C, thisRow: P): void {
    const { childFeature, childEntity, parentFeature, parentEntity } =
      this.childDefinition;
    const childId = adapterForEntity<C>(childFeature, childEntity).selectId(
      newRow,
    ) as string;
    const parentId = adapterForEntity<P>(parentFeature, parentEntity).selectId(
      thisRow,
    ) as string;
    const { actions, parentActions, store } = this.getActionsAndStore();
    let newParent: P = { ...thisRow, isEditing: true };
    // We aren't using the 2nd generic parameter of CustomProxy, so we just
    // use the base type of SmartNgRXRowBase here.
    const customProxy = castTo<CustomProxy<P, SmartNgRXRowBase>>(thisRow);
    if (customProxy.getRealRow !== undefined) {
      newParent = {
        ...customProxy.getRealRow(),
        ...customProxy.changes,
        isEditing: true,
      };
    }
    newRow.parentId = parentId;
    newRow.isEditing = true;
    store.dispatch(actions.loadByIdsSuccess({ rows: [newRow] }));
    castTo<Record<keyof P, string[]>>(newParent)[
      this.childDefinition.parentField
    ] = [...this.rawArray, childId];
    store.dispatch(parentActions.loadByIdsSuccess({ rows: [newParent] }));
  }

  /**
   * This removes a row from the store that was previously added, but not
   * saved to the server yet.
   *
   * @param row the row to remove from the array
   * @param parent the parent entity that contains the array
   */
  removeFromStore(row: C, parent: P): void {
    const { childFeature, childEntity } = this.childDefinition;
    const childId = adapterForEntity<C>(childFeature, childEntity).selectId(
      row,
    ) as string;
    const { actions, parentActions, store } = this.getActionsAndStore();
    let newParent: P = { ...parent, isEditing: false };
    // we aren't using the 2nd generic parameter of CustomProxy, so we just
    // use the base type of SmartNgRXRowBase here.
    const customProxy = castTo<CustomProxy<P, SmartNgRXRowBase>>(parent);
    if (customProxy.getRealRow !== undefined) {
      newParent = {
        ...customProxy.getRealRow(),
        ...customProxy.changes,
        isEditing: false,
      };
    }
    castTo<Record<keyof P, string[]>>(newParent)[
      this.childDefinition.parentField
    ] = this.rawArray.filter((cid) => cid !== childId);
    store.dispatch(actions.garbageCollect({ ids: [childId] }));
    store.dispatch(parentActions.loadByIdsSuccess({ rows: [newParent] }));
  }
}
