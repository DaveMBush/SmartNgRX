import { RowProp } from '../types/row-prop.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

/**
 * Helper function that updates the maps used in update-effect.function.ts
 * so we can implement optimistic updates and can rollback on error when
 * needed.
 *
 * @param lastRow the map of the last row sent to the server
 * @param lastRowTimeout the map of the last time a row was sent to the server
 * @param action the action that was dispatched
 * @param action.old the row the new row is replacing
 * @param action.new the new row we are sending to the server
 */
export function manageMaps<T extends SmartNgRXRowBase>(
  lastRow: Map<string, T>,
  lastRowTimeout: Map<string, number>,
  action: {
    old: RowProp<T>;
    new: RowProp<T>;
  },
): void {
  const now = Date.now();
  const keys = Array.from(lastRowTimeout.keys());
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const timeStamp = lastRowTimeout.get(key)!;
    // break out when there are no longer items to process
    // because we use a map, items are in time order.
    if (now - timeStamp < 60000) {
      break;
    }
    lastRowTimeout.delete(key);
    lastRow.delete(key);
  }
  // for now we assume everything has a primary key of id.
  const id = action.old.row.id;
  if (!lastRowTimeout.has(id)) {
    lastRowTimeout.set(id, now);
    lastRow.set(id, action.old.row);
  }
}
