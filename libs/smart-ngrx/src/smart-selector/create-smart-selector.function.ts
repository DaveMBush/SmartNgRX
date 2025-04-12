import { EntityState } from '@ngrx/entity';
import { MemoizedSelector } from '@ngrx/store';
import { SmartNgRXRowBase } from '@smarttools/core';

import { ChildDefinitionClassic } from '../types/child-definition-classic.interface';
import { createInnerSmartSelector } from './create-inner-smart-selector.function';
import { ParentSelector } from './parent-selector.type';

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
 * @param parentSelector The selector to retrieve the parent data
 * from the store.
 * @param children The array of `ChildDefinition` objects that define the
 * child data to retrieve.
 * @returns Memozied selector that returns the selected data.
 *
 * @see `ChildDefinition`
 * @see `ParentSelector`
 */
export function createSmartSelector<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  parentSelector: ParentSelector<P>,

  children: ChildDefinitionClassic<P, T>[],
): MemoizedSelector<object, EntityState<P>> {
  return children.reduce(createSmartSelectorChildReducer<P, T>, parentSelector);
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
