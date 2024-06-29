import { ActionService } from '../actions/action.service';
import { castTo } from '../common/cast-to.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { RowProxy } from './row-proxy.class';
import { RowProxyDelete } from './row-proxy-delete.interface';

/**
 * Wraps a row in a proxy that will take care of editing the row
 * and firing off the appropriate actions (via the services) to
 * update the store and the server.
 *
 * Note: this function will attempt to make the keys in the row
 * writeable so if you are relying on NgRX to ensure these are
 * not mutated, you will need to find some other way to do that.
 *
 * @param row the row to wrap
 * @param service the service that will handle updating the row
 * @param parentService the service that will handle updating the parent row
 * @returns a proxy that will handle updating the row
 */
export function rowProxy<
  T extends SmartNgRXRowBase,
  P extends SmartNgRXRowBase,
>(
  row: T,
  service: ActionService<T>,
  parentService: ActionService<P>,
): RowProxyDelete & T {
  return castTo<RowProxyDelete & T>(new RowProxy(row, service, parentService));
}
