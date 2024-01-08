import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { ActionGroup } from '../functions/action-group.interface';
import { store as storeFunction } from '../selector/store.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';

/**
 * Wraps a row in a proxy that will take care of editing the row
 * and firing off the appropriate actions to update the store and
 * the server.
 *
 * Note: this function will attempt to make the keys in the row
 * writeable so if you are relying on NgRX to ensure these are
 * not mutated, you will need to find some other way to do that.
 *
 * @param row the row to wrap
 * @param actions the action group for the feature/entity this will be used to dispatch the update.
 * @returns a proxy that will handle updating the row
 */
export function rowProxy<T extends MarkAndDelete>(
  row: T,
  actions: ActionGroup<T>,
): T {
  return castTo<T>(new CustomProxy(row, actions));
}

/**
 * Since proxying the row directly will cause the setter to throw
 * an error when the NgRX rules are turned on that disallow mutating
 * the row directly, we need to wrap the row in our own class that
 * uses the Proxy class to handle the updates. By casting the CustomProxy
 * to type T (above) the rest of our code still believes it is working
 * with the original row.
 */
class CustomProxy<T extends MarkAndDelete> {
  changes = {} as Record<string | symbol, unknown>;
  record: Record<string | symbol, unknown> = {};
  constructor(
    public row: T,
    actions: ActionGroup<T>,
  ) {
    this.record = castTo<Record<string | symbol, unknown>>(row);
    return new Proxy(this, {
      get(target, prop) {
        return prop in target.changes
          ? target.changes[prop]
          : target.record[prop];
      },
      set(target, prop, value) {
        if (!(prop in target.record)) {
          return false;
        }
        const store = storeFunction();
        assert(!!store, 'store is undefined');
        store.dispatch(
          actions.update({
            new: { row: { ...target.row, [prop]: value } },
            old: { row: target.row },
          }),
        );
        return true;
      },
    });
  }
}
