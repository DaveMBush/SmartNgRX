import { castTo } from '../common/cast-to.function';
import { forNext } from '../common/for-next.function';
import { ActionGroup } from '../functions/action-group.interface';
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
  T extends SmartNgRXRowBase,
  P extends SmartNgRXRowBase,
> {
  changes = {} as Record<string | symbol, unknown>;
  record: Record<string | symbol, unknown> = {};

  /**
   * This is the constructor for the CustomProxy class.
   *
   * @param row The row to create the custom proxy for
   * @param actions the action group associated with the row entity
   * @param parentActions the action group associated with the parent entity
   * @returns a proxy that will handle updating the row
   */
  constructor(
    public row: T,
    actions: ActionGroup<T>,
    parentActions: ActionGroup<P>,
  ) {
    this.record = castTo<Record<string | symbol, unknown>>(row);
    return new Proxy(this, {
      get: (target, prop) => customProxyGet(target, prop, actions),
      set: (target, prop, value) =>
        customProxySet(target, prop, value, { actions, parentActions }),
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
}
