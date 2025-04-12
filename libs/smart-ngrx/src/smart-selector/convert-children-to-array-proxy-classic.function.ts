import { EntityState } from '@ngrx/entity';
import {
  BaseArrayProxy,
  BaseChildDefinition,
  castTo,
  forNext,
  SmartNgRXRowBase,
} from '@smarttools/core';

import { ArrayProxyClassic } from './array-proxy-classic.class';

/**
 * wraps the array in a proxy so we can return a row for the ID
 *
 * @param parentEntity the entity that holds the parent rows
 * @param parentFieldName the field name that holds the child ids
 * @param child the child entity
 * @param childDefinition the child definition (used by the ArrayProxy)
 *
 * @returns the entity with the child field converted to an array proxy
 */
export function convertChildrenToArrayProxyClassic<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  parentEntity: EntityState<P>,
  parentFieldName: keyof P,
  child: EntityState<C>,
  childDefinition: BaseChildDefinition<P>,
): EntityState<P> {
  const returnEntity = {
    ids: [...parentEntity.ids],
    entities: { ...parentEntity.entities },
  } as EntityState<P>;

  forNext(
    parentEntity.ids as string[],
    function innerConvertChildrenToArrayProxy(w) {
      const entity: P = { ...returnEntity.entities[w] } as P;
      parentEntity.entities[w] = entity;
      const childArray = entity[parentFieldName] as
        | BaseArrayProxy<P, C>
        | string[];

      const arrayProxy = new ArrayProxyClassic<P, C>(
        childArray,
        child,
        childDefinition,
      );
      arrayProxy.init();
      castTo<Record<string, unknown>>(entity)[parentFieldName as string] =
        arrayProxy;
      returnEntity.entities[w] = entity;
    },
  );

  return returnEntity;
}
