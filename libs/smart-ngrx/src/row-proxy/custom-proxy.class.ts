import { ActionService } from '../actions/action.service';
import { castTo } from '../common/cast-to.function';
import { forNext } from '../common/for-next.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { customProxyGet } from './custom-proxy-get.function';
import { customProxySet } from './custom-proxy-set.function';

/**
 * CustomProxy wraps the row so we can intercept changes to it
 * and fire off the appropriate actions to update the store and
 * the server.
 *
 * Since proxying the row directly will cause the setter to throw
 * an error when the NgRX rules are turned on that disallow mutating
 * the row directly, we need to wrap the row in our own class that
 * uses the Proxy class to handle the updates. By casting the CustomProxy
 * to type T (above) the rest of our code still believes it is working
 * with the original row.
 */
export class CustomProxy<
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
  P extends SmartNgRXRowBase = SmartNgRXRowBase,
> {
  changes = {} as Record<string | symbol, unknown>;
  record: Record<string | symbol, unknown> = {};

  /**
   * This is the constructor for the CustomProxy class.
   *
   * @param row The row to create the custom proxy for
   * @param service The service that will handle updating the row
   * @param parentService The service that will handle updating the parent row
   * @returns a proxy that will handle updating the row
   */
  constructor(
    public row: T,
    private service: ActionService<T>,
    parentService: ActionService<P>,
  ) {
    this.record = castTo<Record<string | symbol, unknown>>(row);
    return new Proxy(this, {
      get: (target, prop) => customProxyGet(target, prop, service),
      set: (target, prop, value) =>
        customProxySet(target, prop, value, { service, parentService }),
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
    // We have to create a row that uses the rawArray instead of the
    // one we are proxying so that the proxy doesn't get triggered
    // and cause an infinite loop.
    forNext(keys, (key) => {
      const rawArray = castTo<{ rawArray: string[] }>(
        this.record[key],
      ).rawArray;
      if (rawArray !== undefined) {
        realRow[key] = rawArray;
      } else {
        realRow[key] = this.record[key];
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
    const id = this.service.entityAdapter.selectId(this.row) as string;
    this.service.delete(id);
  }
}
