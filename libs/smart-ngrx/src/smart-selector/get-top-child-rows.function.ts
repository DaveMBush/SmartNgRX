import { EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { SmartNgRXRowBase } from '@smarttools/smart-core';

type KeysWithArrayOf<P, C> = {
  [K in keyof P]: P[K] extends C[] ? K : never;
}[keyof P];

/**
 * This selector allows you to retrieve the child rows out of a
 * top level item.
 *
 * @param parentSelector A selector that returns an EntityState of the top level item.
 * @param childFieldName The name of the field on the parent type that contains the child rows.
 * @returns A selector that returns an array of child rows.
 */
export function getTopChildRows<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
  K extends KeysWithArrayOf<P, C> & keyof P, // ensures the field is an array of C
>(parentSelector: MemoizedSelector<object, EntityState<P>>, childFieldName: K) {
  return createSelector(parentSelector, function selectChildFunction(tops) {
    const maybeParent =
      tops.ids.length === 1 ? tops.entities[tops.ids[0]] : undefined;
    const children = maybeParent?.[childFieldName];
    return Array.isArray(children) ? (children as C[]) : [];
  });
}
