import { EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ArrayProxy } from './array-proxy.class';
import { ParentSelector } from './parent-selector.type';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { ChildType } from '../types/child-type.type';
import { VirtualArray } from './virtual-array.class';
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
 * @access internal
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
    childSelector,
    parentField: parentFieldName,
  } = childDefinition;
  childDefinitionRegistry.registerChildDefinition(
    childFeature,
    childEntity,
    childDefinition,
  );

  return castTo<MemoizedSelector<object, EntityState<P>>>(
    createSelector(parentSelector, childSelector, (parent, child) => {
      const children = entityDefinitionCache(
        parentFeature,
        parentEntity,
      ).children as Partial<Record<keyof P, ChildType>> | undefined;
      if (children?.[parentFieldName] === 'virtual') {
        // Because NgRX freeze may be turned on
        if (Object.isFrozen(parent)) {
          parent = { ...parent };
          parent.ids = [...parent.ids] as number[] | string[];
          parent.entities = { ...parent.entities };
        }
        parent.ids.forEach((id) => {
          let row = parent.entities[id]!;
          // Because NgRX freeze may be turned on
          if (Object.isFrozen(row[parentFieldName])) {
            row = { ...row };
          }
          row[parentFieldName] = new VirtualArray<P,C>(row[parentFieldName] as number) as P[keyof P];
          parent.entities[id] = row;
        });
        return parent;
      }

      const newParentEntity: EntityState<P> = {
        ids: [...parent.ids] as number[] | string[],
        entities: { ...parent.entities },
      };
      (newParentEntity.ids as string[]).forEach((w) => {
        const entity: P = { ...newParentEntity.entities[w] } as P;
        newParentEntity.entities[w] = entity;
        const childArray = entity[parentFieldName] as
          | ArrayProxy<P, C>
          | string[];

        const arrayProxy = new ArrayProxy<P, C>(
          childArray,
          child,
          childDefinition,
        );
        arrayProxy.init();
        castTo<Record<string, unknown>>(entity)[parentFieldName as string] =
          arrayProxy;
      });
      return newParentEntity;
    }),
  );
}
