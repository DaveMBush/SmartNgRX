import { EntityState } from '@ngrx/entity';
import { MemoizedSelector } from '@ngrx/store';

import { ProxyChild } from '../types/proxy-child.interface';
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
 * @param parentSelector - The selector to retrieve the parent data
 * from the store.
 * @param children - The array of `ProxyChild` objects that define the
 * child data to retrieve.
 * @returns Memozied selector that returns the proxied arrays.  It is
 * typed as a regular Selector to keep the compiler happy.
 *
 * @see `ProxyChild`
 * @see `ParentSelector`
 */
export function createSmartSelector<P extends object>(
  parent: ParentSelector<P>,
  children: ProxyChild<P>[],
): MemoizedSelector<object, EntityState<P>> {
  return children.reduce((p, child) => {
    return createInnerSmartSelector(p, child);
  }, parent);
}
