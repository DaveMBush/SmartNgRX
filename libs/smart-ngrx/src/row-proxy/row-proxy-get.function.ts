import { ActionServiceBase } from '../actions/action.service.base';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { RowProxy } from './row-proxy.class';

/**
 * This provides the get method of the Proxy in RowProxy
 *
 * @param service the `ActionService` that handles the actions for the row
 * @returns the value of the property
 */
export function rowProxyGet<T extends SmartNgRXRowBase>(
  service: ActionServiceBase<T>,
): (target: RowProxy<T>, prop: string | symbol) => unknown {
  return function innerRowProxyGet(target: RowProxy<T>, prop: string | symbol) {
    if (prop === 'toJSON') {
      return target.toJSON.bind(target);
    }
    if (prop === 'getRealRow') {
      return target.getRealRow.bind(target);
    }
    if (prop === 'delete') {
      return target.delete.bind(target);
    }
    if (prop === 'isEditing') {
      service.loadByIdsSuccess([{ ...target.row, isEditing: true }]);
    }
    return prop in target.changes ? target.changes[prop] : target.record[prop];
  };
}
