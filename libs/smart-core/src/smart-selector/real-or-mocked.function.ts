import { EntityState } from '@ngrx/entity';

import { FacadeBase } from '../facades/facade.base';
import { rowProxy } from '../row-proxy/row-proxy.function';
import { BaseChildDefinition } from '../types/base-child-definition.interface';
import { RowProxyDelete } from '../types/row-proxy-delete.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { getServices } from './get-services.function';

/**
 * Internal function used by `createInnerSmartSelector` use to load the data if
 * it doesn't exist in the store and return a placeholder row if it doesn't
 *
 * @param entityState the `EntityState` used to lookup the id
 * @param id the id to lookup
 * @param defaultObject the default object to return if the id doesn't exist
 * @param childDefinition the `ChildDefinition` of the child object that
 * lets us retrieve the feature and entity names
 * @returns the row from the store or the default object
 *
 * @see `createInnerSmartSelector`
 */
export function realOrMocked<
  T extends SmartNgRXRowBase,
  P extends SmartNgRXRowBase,
>(
  entityState: EntityState<T>,
  id: string,
  defaultObject: T,
  childDefinition: BaseChildDefinition<P>,
): RowProxyDelete & T {
  const { service, parentService } = getServices<P, T>(childDefinition);

  const record = entityState.entities;
  let row = record[id];
  if (row === undefined) {
    row = { ...defaultObject, id, isLoading: true };
  }
  return rowProxy<T>(row, service, parentService as unknown as FacadeBase);
}
