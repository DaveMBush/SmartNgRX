import { castTo } from '../common/cast-to.function';
import { forNext } from '../common/for-next.function';
import { FacadeBase } from '../facades/facade.base';
import { ArrayProxy } from '../selector/array-proxy.class';
import { RowProxyDelete } from '../types/row-proxy-delete.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { rowProxyGet } from './row-proxy-get.function';
import { rowProxySet } from './row-proxy-set.function';

/**
 * RowProxy wraps the row so we can intercept changes to it
 * and fire off the appropriate actions to update the store and
 * the server.
 *
 * Since proxying the row directly will cause the setter to throw
 * an error when the NgRX rules are turned on that disallow mutating
 * the row directly, we need to wrap the row in our own class that
 * uses the Proxy class to handle the updates. By casting the RowProxy
 * to type T (above) the rest of our code still believes it is working
 * with the original row.
 */
export class RowProxy<T extends SmartNgRXRowBase = SmartNgRXRowBase>
  implements RowProxyDelete
{
  changes = {} as Record<string | symbol, unknown>;
  record: Record<string | symbol, unknown> = {};

  /**
   * This is the constructor for the RowProxy class.
   *
   * @param row The row to create the custom proxy for
   * @param service The service that will handle updating the row
   * @param parentService The service that will handle updating the parent row
   * @returns a proxy that will handle updating the row
   */
  constructor(
    public row: T,
    private service: FacadeBase<T>,
    parentService: FacadeBase,
  ) {
    this.record = castTo<Record<string | symbol, unknown>>(row);

    return new Proxy(this, {
      get: rowProxyGet(service),
      set: rowProxySet({ service, parentService }),
    });
  }

  /**
   * This retrieves the backing row for this proxy
   *
   * @returns the backing row for this proxy
   */
  getRealRow(): T {
    const keys = Object.keys(this.row);
    const realRow: Record<string | symbol, unknown> = {};
    const record = this.record;
    // We have to create a row that uses the rawArray instead of the
    // one we are proxying so that the proxy doesn't get triggered
    // and cause an infinite loop. Therefore, we need to cast the
    // record to SmartArray to get at the rawArray if it exists.
    forNext(keys, function getRealRowsForNext(key) {
      const rawArray = (record[key] as ArrayProxy).rawArray;
      if (rawArray !== undefined) {
        realRow[key] = rawArray;
      } else {
        realRow[key] = record[key];
      }
    });
    return realRow as T;
  }

  /**
   * When we stringify this object, it needs to stringify the real row
   * and any changes we've made to it.
   *
   * @returns the real row with any changes we've made to it
   */
  toJSON() {
    return { ...this.getRealRow(), ...this.changes };
  }

  /**
   * Initiates delete of this object from the server which will
   * also optimistically update the store
   */
  delete(): void {
    const id = this.service.selectId(this.row);
    this.service.delete(id);
  }
}
