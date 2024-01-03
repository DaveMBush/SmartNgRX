import { EntityState } from '@ngrx/entity';

import { ActionGroup } from '../functions/action-group.interface';
import { rowProxy } from '../row-proxy/row-proxy.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';

/**
 * Internal function used by `createInnerSmartSelector` use to load the data if
 * it doesn't exist in the store and return a placeholder row if it doesn't
 *
 * @param entityState the entity used to lookup the id
 * @param id the id to lookup
 * @param defaultObject the default object to return if the id doesn't exist
 * @param actions actions associated with the entity
 * @returns the row from the store or the default object
 *
 * @see `createInnerSmartSelector`
 */
export function realOrMocked<T extends MarkAndDelete>(
  entityState: EntityState<T>,
  id: string,
  defaultObject: T,
  actions: ActionGroup<T>,
): T {
  const record = entityState.entities;
  const row = record[id];
  if (row === undefined) {
    return { ...defaultObject, id };
  }
  return rowProxy(row, actions);
}
