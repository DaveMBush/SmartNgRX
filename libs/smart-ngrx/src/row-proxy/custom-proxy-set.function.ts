import { ActionService } from '../actions/action.service';
import { castTo } from '../common/cast-to.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { CustomProxy } from './custom-proxy.class';

/**
 * This provides the set method of the Proxy in CustomProxy
 *
 * @param target the CustomProxy the Proxy targets
 * @param prop the property the proxy needs to set
 * @param value the value to set the property to
 * @param services the services associated with the row and parent entity
 * @param services.service the service associated with the row entity
 * @param services.parentService the service associated with the parent entity
 * @returns true if the property was set, false otherwise
 */
export function customProxySet<
  T extends SmartNgRXRowBase,
  P extends SmartNgRXRowBase,
>(
  target: CustomProxy<T, P>,
  prop: string | symbol,
  value: unknown,
  services: { service: ActionService<T>; parentService: ActionService<P> },
): boolean {
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
      castTo<ActionService<SmartNgRXRowBase>>(services.parentService),
    );
    return true;
  }
  // if there is not parentId then we are simply saving the
  // row to the server
  services.service.update(realRow, { ...realRow, [prop]: value } as T);
  return true;
}
