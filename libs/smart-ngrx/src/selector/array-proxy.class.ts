import { EntityState } from '@ngrx/entity';

import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { getArrayItem } from './get-array-item.function';
import { isArrayProxy } from './is-array-proxy.function';

/**
 * This is an internal class used by `createSmartSelector` to wrap the field
 * that represents the child array with a class that manages all the
 * magic of loading the data from the server as it is accessed.
 *
 * @see `createSmartSelector`
 */
export class ArrayProxy<
  C extends MarkAndDelete,
  F extends string = string,
  E extends string = string,
> implements ArrayLike<C>
{
  [isProxy] = true;
  rawArray: string[] = [];

  /**
   * The constructor for the ArrayProxy class.
   *
   * @param childArray The array of ids to wrap
   * @param child The child entity we use to find the item in the store
   * @param feature the feature the child belongs to
   * @param entity the entity in the feature the child belongs to
   */
  constructor(
    private childArray: ArrayProxy<C, F, E> | string[],
    private child: EntityState<C>,
    private feature: StringLiteralSource<F>,
    private entity: StringLiteralSource<E>,
  ) {
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
    if (isArrayProxy(this.childArray)) {
      this.childArray = castTo<ArrayProxy<C, F, E>>(this.childArray).rawArray;
    }
    // at this point, we can be sure that childArray is a string[]
    if (Object.isFrozen(this.childArray as string[])) {
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
    if (index >= 0 && index < this.rawArray.length) {
      const id = this.rawArray[index];
      return getArrayItem<C, F, E>(this.child, id, this.feature, this.entity);
    }
    throw new Error('Index out of bounds');
  }
}
