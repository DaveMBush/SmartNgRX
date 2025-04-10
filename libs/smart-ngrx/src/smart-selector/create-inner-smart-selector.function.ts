import { EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { castTo, SmartNgRXRowBase } from '@smarttools/core';

import { childDefinitionRegistry } from '../../../smart-core/src/registrations/child-definition.registry';
import { ChildDefinition } from '../../../smart-core/src/types/child-definition.interface';
import { convertChildrenToArrayProxy } from '../../../smart-core/src/smart-selector/convert-children-to-array-proxy.function';
import { convertChildrenToVirtualArray } from '../../../smart-core/src/smart-selector/convert-children-to-virtual-array.function';
import { ParentSelector } from './parent-selector.type';

/**
 * This is an internal function used by `createSmartSelector`.
 * It is documented here for completeness.  Use `createSmartSelector` instead.
 *
 * createInnerSmartSelector wraps the specified child array with a Proxy that will request the
 * items from the server as they are accessed (virtual data) rather than loading
 * everything from the array up front.
 *
 * In order to access the array without triggering a request, as is needed for a tree control
 * that uses virtual data, the proxy adds support for a rawArray property that returns the
 * original array before it was proxied.
 *
 * @param parentSelector The `ParentSelector` to retrieve the parent data from the store.
 * @param childDefinition `ChildDefinition` that defines what the child should look like
 * @returns - an entity with the specified childArray proxies so that when an element is
 *         accessed, the childAction will be dispatched to request data from the server.
 *
 * @see `createSmartSelector`
 * @see `ChildDefinition`
 * @see `ParentSelector`
 */
export function createInnerSmartSelector<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  parentSelector: ParentSelector<P>,
  childDefinition: ChildDefinition<P, C>,
): MemoizedSelector<object, EntityState<P>> {
  const {
    childFeature,
    childEntity,
    parentFeature,
    parentEntity,
    parentField: parentFieldName,
  } = childDefinition;
  const childSelector = childDefinition.childSelector;
  childDefinitionRegistry.registerChildDefinition(
    childFeature,
    childEntity,
    childDefinition,
  );
  return castTo<MemoizedSelector<object, EntityState<P>>>(
    createSelector(
      parentSelector,
      childSelector,
      function innerCreateInnerSmartSelector(parent, child) {
        const newParentEntity: EntityState<P> = {
          ids: [...parent.ids] as number[] | string[],
          entities: { ...parent.entities },
        };

        let returnEntity = convertChildrenToVirtualArray(
          parentFieldName,
          newParentEntity,
          parentFeature,
          parentEntity,
        );

        returnEntity = convertChildrenToArrayProxy(
          returnEntity,
          parentFieldName,
          child,
          childDefinition as ChildDefinition<P>,
        );
        return returnEntity;
      },
    ),
  );
}
