import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { getArrayItem } from './get-array-item.function';

/**
 * This is an internal function used by `createSmartSelector` to wrap the field
 * that represents the child array with a Proxy class that manages all the
 * magic of loading the data from the server as it is accessed.
 * @param childArray The array of ids to wrap
 * @param child The child entity we use to find the item in the store
 * @param childAction the action to fire if the item has not been loaded
 * @param defaultChildRow function that returns a default row for the child
 * @returns
 *
 * @see `createSmartSelector`
 */
export function proxyArray<C>(
  childArray: (C | string)[],
  child: EntityState<MarkAndDelete>,
  childAction: (p: { ids: string[] }) => Action,
  defaultChildRow: (id: string) => C,
): (C | string)[] {
  return new Proxy<(C | string)[]>(childArray, {
    get: (target: string[], property: string | symbol) => {
      if (property === 'θisProxyθ') {
        return true;
      }
      if (property === 'rawArray') {
        return target;
      }
      // check to make sure it is an index into the array
      // and there is a value at that index
      if (
        typeof property === 'string' &&
        typeof +property === 'number' &&
        typeof target[+property] === 'string'
      ) {
        const id = target[+property];
        return getArrayItem(
          child,
          id,
          childAction,
          defaultChildRow(id) as MarkAndDelete,
        );
      }
      return castTo<Record<string | symbol, C>>(target)[property];
    },
  });
}
