import { EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ProxyArray } from '../types/proxy-array.interface';
import { ProxyChild } from '../types/proxy-child.interface';
import { proxyArray } from './proxy-array.function';

/**
 * This is an internal function used by createSmartSelector.
 * It is documented here for completeness.  Use createSmartSelector instead.
 *
 *
 * createInnerSmartSelector wraps the specified child array with a Proxy that will request the
 * items from the server as they are accessed (virtual data) rather than loading
 * everything from the array up front.
 * In order to access the array without triggering a request, as is needed for a tree control
 * that uses virtual data, the proxy adds support for a rawArray property that returns the
 * original array before it was proxied.
 * @param parentSelector - The selector to retrieve the parent data from the store.
 * @proxyChild - object with the following props
 *     @param childSelector - The selector to retrieve the child data from the store.
 *     @param childAction - The action to fire when data is not found in the child store.
 *     @param defaultChildRow - The default row to use when the child data is not found.
 *     @param childArrayName - The name of the property in the parent that contains the child IDs.
 *     @returns - an entity with the specified childArray proxies so that when an element is
 *         accessed, the childAction will be dispatched to request data from the server.
 */

// eslint-disable-next-line ngrx/prefix-selectors-with-select -- it isn't a selector
export function createInnerSmartSelector<
  P extends object,
  C extends MarkAndDelete
>(
  parentSelector: MemoizedSelector<object, EntityState<P>>,
  { childSelector, childAction, defaultChildRow, childName }: ProxyChild<P>
): MemoizedSelector<object, EntityState<P>> {
  return castTo<MemoizedSelector<object, EntityState<P>>>(
    createSelector(parentSelector, childSelector, (parent, child) => {
      const newParentEntity: EntityState<P> = {
        ids: [...parent.ids] as number[] | string[],
        entities: { ...parent.entities },
      };
      (newParentEntity.ids as string[]).forEach((w) => {
        const entity: P = { ...newParentEntity.entities[w] } as P;
        newParentEntity.entities[w] = entity;
        let childArray = entity[childName] as (C | string)[];
        // fill childArray with values from entity that we currently have
        if (castTo<ProxyArray<C>>(childArray).θisProxyθ) {
          childArray = castTo<ProxyArray<C>>(childArray).rawArray;
        }

        castTo<Record<string, unknown>>(entity)[childName as string] =
          proxyArray(childArray, child, childAction, defaultChildRow);
      });
      return newParentEntity;
    })
  );
}
