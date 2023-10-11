import { EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { actionFactory } from '../functions/action.factory';
import { registerEntity } from '../functions/register-entity.function';
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
  C extends MarkAndDelete,
>(
  parentSelector: MemoizedSelector<object, EntityState<P>>,
  {
    childFeature,
    childFieldName,
    childSelector,
    parentFieldName,
  }: ProxyChild<P>,
): MemoizedSelector<object, EntityState<P>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- has to be any to get around the literal typing
  const actions = actionFactory((childFeature + ':' + childFieldName) as any);
  return castTo<MemoizedSelector<object, EntityState<P>>>(
    createSelector(parentSelector, childSelector, (parent, child) => {
      const newParentEntity: EntityState<P> = {
        ids: [...parent.ids] as number[] | string[],
        entities: { ...parent.entities },
      };
      (newParentEntity.ids as string[]).forEach((w) => {
        const entity: P = { ...newParentEntity.entities[w] } as P;
        newParentEntity.entities[w] = entity;
        let childArray = entity[parentFieldName] as (C | string)[];
        // fill childArray with values from entity that we currently have
        if (castTo<ProxyArray<C>>(childArray).θisProxyθ) {
          childArray = castTo<ProxyArray<C>>(childArray).rawArray;
        } else if (Object.isFrozen(childArray)) {
          // unfreeze the original array so we can proxy it.
          entity[parentFieldName] = [...childArray] as P[keyof P];
          childArray = entity[parentFieldName] as (C | string)[];
        }

        // if you call this sooner, you may not have registered the entity yet
        const reg = registerEntity(childFeature, childFieldName);
        // eslint-disable-next-line @typescript-eslint/unbound-method -- it won't be bound
        const defaultRow = reg.defaultRow as (id: string) => C;

        castTo<Record<string, unknown>>(entity)[parentFieldName as string] =
          proxyArray(childArray, child, actions.loadByIds, defaultRow);
      });
      return newParentEntity;
    }),
  );
}
