import { ActionService } from '../actions/action.service';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { CustomProxy } from './custom-proxy.class';

/**
 * This provides the get method of the Proxy in CustomProxy
 *
 * @param target the CustomProxy the Proxy targets
 * @param prop the property the proxy needs to retrieve
 * @param service the service that handles the actions for the row
 * @returns the value of the property
 */
export function customProxyGet<
  T extends SmartNgRXRowBase,
  P extends SmartNgRXRowBase,
>(
  target: CustomProxy<T, P>,
  prop: string | symbol,
  service: ActionService<T>,
): unknown {
  if (prop === 'toJSON') {
    return () => target.toJSON();
  }
  if (prop === 'getRealRow') {
    return () => target.getRealRow();
  }
  if (prop === 'delete') {
    return () => target.delete();
  }
  if (prop === 'isEditing') {
    service.loadByIdsSuccess([{ ...target.row, isEditing: true }]);
  }
  return prop in target.changes ? target.changes[prop] : target.record[prop];
}
