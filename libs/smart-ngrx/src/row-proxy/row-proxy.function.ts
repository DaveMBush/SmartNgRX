import { ActionService } from '../actions/action.service';
import { castTo } from '../common/cast-to.function';
import { RowProxyDelete } from '../types/row-proxy-delete.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { forceRefetchOfVirtualIndexes } from './force-refetch-of-virtual-indexes.function';
import { RowProxy } from './row-proxy.class';

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
 * @param service the `ActionService` that will handle updating the row
 * @param parentService the `ActionService` that will handle updating the parent row
 * @returns a proxy that will handle updating the row but is typed as T and `RowProxyDelete`
 */
export function rowProxy<T extends SmartNgRXRowBase>(
  row: T,
  service: ActionService<T>,
  parentService: ActionService,
): RowProxyDelete & T {
  forceRefetchOfVirtualIndexes<T>(row);
  // To the outside world, this has to look like the original row
  // so we cast it to the original type. This is safe because the
  // proxy is only used to intercept access to the original row.
  return castTo<RowProxyDelete & T>(new RowProxy(row, service, parentService));
}
