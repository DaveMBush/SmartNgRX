import { EntityAdapter, EntityState } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { actionFactory } from '../functions/action.factory';
import { adapterForEntity } from '../functions/adapter-for-entity.function';
import { CustomProxy } from '../row-proxy/custom-proxy.class';
import { ProxyChild } from '../types/proxy-child.interface';
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
export class ArrayProxy<
  P extends object,
  C extends SmartNgRXRowBase,
  F extends string = string,
  E extends string = string,
> implements ArrayLike<C>
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
    private childArray: ArrayProxy<P, C, F, E> | string[],
    private child: EntityState<C>,
    private childDefinition: ProxyChild<P, F, E>,
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
      this.childArray = castTo<ArrayProxy<P, C, F, E>>(
        this.childArray,
      ).rawArray;
    }
    // at this point, we can be sure that childArray is a string[]
    if (Object.isFrozen(this.childArray)) {
      // unfreeze the original array so we can proxy it.
      this.childArray = [...(this.childArray as string[])];
    }

    this.rawArray = this.childArray as string[];
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
    const { childFeature, childEntity } = this.childDefinition;
    if (index >= 0 && index < this.rawArray.length) {
      const id = this.rawArray[index];
      return getArrayItem<C, F, E>(this.child, id, childFeature, childEntity);
    }
    throw new Error('Index out of bounds');
  }

  /**
   * This method allows us to add an item to the array. Make sure it contains
   * and ID field and any other defaults you might need
   *
   * @param row the item to add to the array
   * @param parent the parent entity that contains the array
   */
  add(row: C, parent: P): void {
    const { childFeature, childEntity, parentFeature, parentEntity } =
      this.childDefinition;
    const childId = adapterForEntity<C>(childFeature, childEntity).selectId(
      row,
    ) as string;
    const actions = actionFactory(childFeature, childEntity);
    const parentActions = actionFactory(parentFeature, parentEntity);
    const store = storeFunction();
    assert(!!store, 'store is undefined');
    let newParent = { ...parent };
    const customProxy = castTo<CustomProxy<P>>(parent);
    if (customProxy.getRealRow !== undefined) {
      newParent = { ...customProxy.getRealRow(), ...customProxy.changes };
    }
    castTo<Record<keyof P, string[]>>(newParent)[
      this.childDefinition.parentField
    ] = [...this.rawArray, childId];
    row.isAdding = true;
    store.dispatch(actions.loadByIdsSuccess({ rows: [row] }));
    store.dispatch(parentActions.loadByIdsSuccess({ rows: [newParent] }));
  }
}
