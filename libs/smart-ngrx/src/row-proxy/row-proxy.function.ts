import { assert } from '../common/assert.function';
import { ActionGroup } from '../functions/action-group.interface';
import { store as storeFunction } from '../selector/store.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';

/**
 * Wraps a row in a proxy that will take care of editing the row
 * and firing off the appropriate actions to update the store and
 * the server.
 *
 * @param row the row to wrap
 * @param actions the action group for the feature/entity this will be used to dispatch the update.
 * @returns a proxy that will handle updating the row
 */
export function rowProxy<T extends MarkAndDelete>(
  row: T,
  actions: ActionGroup<T>,
): T {
  const proxy = new Proxy(row as object, {
    set(_, prop, value) {
      assert(
        prop !== 'id',
        'You cannot change the id of an object. You must delete and recreate it.',
      );
      const store = storeFunction();
      assert(!!store, 'store is undefined');
      store.dispatch(actions.update({ row: { ...row, [prop]: value } }));
      return true;
    },
  });
  return proxy as T;
}
