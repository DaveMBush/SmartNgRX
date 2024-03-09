import { castTo } from '../common/cast-to.function';
import { ActionGroup } from '../functions/action-group.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { CustomProxy } from './custom-proxy.class';

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
export function rowProxy<T extends SmartNgRXRowBase, P extends SmartNgRXRowBase>(
  row: T,
  actions: ActionGroup<T>,
  parentActions: ActionGroup<P>
): T {
  return castTo<T>(new CustomProxy(row, actions, parentActions));
}
