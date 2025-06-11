import { EntityState } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { SmartNgRXRowBase } from '@smarttools/smart-core';

/**
 * Type that extracts keys from P where the value is an array of either strings or type C
 */
type ChildArrayField<P, C> = keyof {
  [K in keyof P as P[K] extends C[] | string[] ? K : never]: P[K];
};

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
>(
  parentSelector: MemoizedSelector<object, EntityState<P>>,
  childFieldName: ChildArrayField<P, C>,
) {
  return createSelector(parentSelector, function selectChildFunction(tops) {
    const maybeParent =
      tops.ids.length === 1 ? tops.entities[tops.ids[0]] : undefined;
    const children = maybeParent?.[childFieldName];
    return Array.isArray(children) ? (children as C[]) : [];
  });
}
