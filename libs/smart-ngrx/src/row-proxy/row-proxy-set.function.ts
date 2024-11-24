import { ActionService } from '../actions/action.service';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { RowProxy } from './row-proxy.class';

/**
 * This provides the set method of the Proxy in RowProxy
 *
 * @param services the services associated with the row and parent entity
 * @param services.service the `ActionService` associated with the row entity
 * @param services.parentService the `ActionService` associated with the parent entity
 * @returns true if the property was set, false otherwise
 */
export function rowProxySet<T extends SmartNgRXRowBase>(services: {
  service: ActionService;
  parentService: ActionService;
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
      services.service.add(
        { ...realRow, [prop]: value } as T,
        realRow.parentId,
        services.parentService,
      );
      return true;
    }
    // if there is not parentId then we are simply saving the
    // row to the server
    services.service.update(realRow, {
      ...realRow,
      [prop]: value,
    } as T);
    return true;
  };
}
