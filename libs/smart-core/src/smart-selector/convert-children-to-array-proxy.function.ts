import { EntityState } from '@ngrx/entity';

import { castTo } from '../common/cast-to.function';
import { forNext } from '../common/for-next.function';
import { BaseChildDefinition } from '../types/base-child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { BaseArrayProxy } from './base-array-proxy.class';

/**
 * wraps the array in a proxy so we can return a row for the ID
 *
 * @param parentEntity the entity that holds the parent rows
 * @param parentFieldName the field name that holds the child ids
 * @param child the child entity
 * @param childDefinition the child definition (used by the ArrayProxy)
 * @param arrayProxyConstructor the constructor for the array proxy
 *
 * @returns the entity with the child field converted to an array proxy
 */
// eslint-disable-next-line max-params-no-constructor/max-params-no-constructor -- let it slide for now
export function convertChildrenToArrayProxy<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  parentEntity: EntityState<P>,
  parentFieldName: keyof P,
  child: EntityState<C>,
  childDefinition: BaseChildDefinition<P>,
  arrayProxyConstructor: new (
    childArray: BaseArrayProxy<P, C> | string[],
    child: EntityState<C>,
    childDefinition: BaseChildDefinition<P>,
  ) => BaseArrayProxy<P, C>,
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

      const arrayProxy = new arrayProxyConstructor(
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
