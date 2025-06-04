/* eslint-disable @smarttools/one-exported-item-per-file -- needed for overloads */
import { EntityState } from '@ngrx/entity';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { SmartNgRXRowBase } from '@smarttools/smart-core';

import { ChildDefinitionClassic } from '../types/child-definition-classic.interface';
import { createInnerSmartSelector } from './create-inner-smart-selector.function';
import { ParentSelector } from './parent-selector.type';

export function createSmartSelector<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  parentSelector: ParentSelector<P>,

  children: ChildDefinitionClassic<P, T>[],
): MemoizedSelector<object, EntityState<P>>;

export function createSmartSelector<P extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
): MemoizedSelector<object, EntityState<P>>;

/**
 * Wraps the specified child array(s) with a Proxy that will request the
 * items from the server as they are accessed (virtual data) rather than loading
 * everything from the array up front.
 *
 * In order to access the array without triggering a request, as is
 * needed for a tree control that uses virtual data, the proxy adds
 * support for a rawArray property that returns the original array
 * before it was proxied.
 *
 * @param p1 The feature name or the selector to retrieve the parent data
 * from the store.
 * @param p2 The entity name or the array of `ChildDefinition` objects that define the
 * child data to retrieve.
 *
 * If p1 and p2 are not both strings, the code assumes that p1 is a parent
 * selector and p2 is an array of child definitions.
 *
 * @returns Memozied selector that returns the selected data.
 *
 * @see `ChildDefinition`
 * @see `ParentSelector`
 */
export function createSmartSelector<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  p1: ParentSelector<P> | string, // feature name or parent selector
  p2: ChildDefinitionClassic<P, T>[] | string, // entity name or child definitions
): MemoizedSelector<object, EntityState<P>> {
  if (typeof p1 === 'string' && typeof p2 === 'string') {
    return createSelector(
      createFeatureSelector(p1),
      function getEntityState(state: Record<string, unknown>) {
        return state[p2] as EntityState<P>;
      },
    );
  }

  return (p2 as ChildDefinitionClassic<P, T>[]).reduce(
    createSmartSelectorChildReducer<P, T>,
    p1 as ParentSelector<P>,
  );
}

function createSmartSelectorChildReducer<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  parentSelector: ParentSelector<P>,
  childDefinition: ChildDefinitionClassic<P, T>,
) {
  return createInnerSmartSelector(parentSelector, childDefinition);
}
