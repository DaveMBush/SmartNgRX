import { SmartNgRXRowBase } from '@smarttools/core';

import { FacadeBase } from '../facades/facade.base';
import { RowProxy } from './row-proxy.class';

/**
 * This provides the set method of the Proxy in RowProxy
 *
 * @param facades the services associated with the row and parent entity
 * @param facades.facade the Facade associated with the row entity
 * @param facades.parentFacade the Facade associated with the parent entity
 * @returns true if the property was set, false otherwise
 */
export function rowProxySet<T extends SmartNgRXRowBase>(facades: {
  facade: FacadeBase<T>;
  parentFacade: FacadeBase;
}): (target: RowProxy<T>, prop: string | symbol, value: unknown) => boolean {
  return function innerRowProxySet(
    target: RowProxy<T>,
    prop: string | symbol,
    value: unknown,
  ) {
    if (!(prop in target.record)) {
      return false;
    }
    target.changes[prop] = value;
    const realRow = target.getRealRow();
    // if there is a parentId then we need to
    // add the row on the server
    if (realRow.parentId !== undefined) {
      facades.facade.add(
        { ...realRow, [prop]: value } as T,
        realRow.parentId,
        facades.parentFacade,
      );
      return true;
    }
    // if there is not parentId then we are simply saving the
    // row to the server
    facades.facade.update(realRow, {
      ...realRow,
      [prop]: value,
    } as T);
    return true;
  };
}
