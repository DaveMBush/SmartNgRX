import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { ActionGroup } from '../functions/action-group.interface';
import { store as storeFunction } from '../selector/store.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { CustomProxy } from './custom-proxy.class';

/**
 * This provides the set method of the Proxy in CustomProxy
 *
 * @param target the CustomProxy the Proxy targets
 * @param prop the property the proxy needs to set
 * @param value the value to set the property to
 * @param actions the action group associated with the row and parent entity
 * @param actions.actions the action group associated with the row entity
 * @param actions.parentActions the action group associated with the parent entity
 * @returns true if the property was set, false otherwise
 */
export function customProxySet<
  T extends SmartNgRXRowBase,
  P extends SmartNgRXRowBase,
>(
  target: CustomProxy<T, P>,
  prop: string | symbol,
  value: unknown,
  actions: { actions: ActionGroup<T>; parentActions: ActionGroup<P> },
): boolean {
  /* istanbul ignore next -- untestable using strong typing but here to protect misuse by others */
  if (!(prop in target.record)) {
    return false;
  }
  target.changes[prop] = value;
  const realRow = target.getRealRow();
  const store = storeFunction();
  assert(!!store, 'store is undefined');
  // if there is a parentId then we need to
  // add the row on the server
  if (realRow.parentId !== undefined) {
    store.dispatch(
      actions.actions.add({
        row: { ...realRow, [prop]: value } as T,
        parentId: realRow.parentId,
        parentActions: castTo<ActionGroup<SmartNgRXRowBase>>(
          actions.parentActions,
        ),
      }),
    );
    return true;
  }
  // if there is not parentId then we are simply saving the
  // row to the server
  store.dispatch(
    actions.actions.update({
      new: { row: { ...realRow, [prop]: value } as T },
      old: { row: realRow },
    }),
  );
  return true;
}
