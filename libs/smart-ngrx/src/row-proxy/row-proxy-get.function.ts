import { ActionService } from '../actions/action.service';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { RowProxy } from './row-proxy.class';

/**
 * This provides the get method of the Proxy in RowProxy
 *
 * @param target the RowProxy the Proxy targets
 * @param prop the property the proxy needs to retrieve
 * @param service the service that handles the actions for the row
 * @returns the value of the property
 */
export function rowProxyGet<
  T extends SmartNgRXRowBase,
  P extends SmartNgRXRowBase,
>(
  target: RowProxy<T, P>,
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
