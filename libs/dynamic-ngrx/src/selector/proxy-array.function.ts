import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { getArrayItem } from './get-array-item.function';

export const proxyArray = <C>(
  childArray: (C | string)[],
  child: EntityState<MarkAndDelete>,
  childAction: (p: { ids: string[] }) => Action,
  defaultChildRow: C
): (C | string)[] => {
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
          defaultChildRow as MarkAndDelete
        );
      }
      return castTo<Record<string | symbol, C>>(target)[property];
    },
  });
};
