import { computed, Signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import {
  childDefinitionRegistry,
  convertChildrenToArrayProxy,
  convertChildrenToVirtualArray,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';

import { ChildDefinitionSignals } from '../types/child-definition-signals.interface';
import { ArrayProxySignals } from './array-proxy-signals.class';

/**
 * This is an internal function used by `createSmartSignal`.
 * It is documented here for completeness.  Use `createSmartSignal` instead.
 *
 * createInnerSmartSignal wraps the specified child array with a Proxy that will request the
 * items from the server as they are accessed (virtual data) rather than loading
 * everything from the array up front.
 *
 * In order to access the array without triggering a request, as is needed for a tree control
 * that uses virtual data, the proxy adds support for a rawArray property that returns the
 * original array before it was proxied.
 *
 * @param parentSignal The Signal to retrieve the parent data from the store.
 * @param childDefinition `ChildDefinition` that defines what the child should look like
 * @returns - an entity with the specified childArray proxies so that when an element is
 *         accessed, the childAction will be dispatched to request data from the server.
 *
 * @see `createSmartSignal`
 * @see `ChildDefinition`
 */
export function createInnerSmartSignal<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  parentSignal: Signal<EntityState<P>>,
  childDefinition: ChildDefinitionSignals<P, C>,
): Signal<EntityState<P>> {
  const {
    childFeature,
    childEntity,
    parentFeature,
    parentEntity,
    parentField: parentFieldName,
    childSelector,
  } = childDefinition;
  // find the child entity from the actionService
  childDefinitionRegistry.registerChildDefinition(
    childFeature,
    childEntity,
    childDefinition,
  );

  return computed(function createInnerSmartComputedSignal() {
    const parent = parentSignal();

    const child = childSelector();

    let returnEntity = convertChildrenToVirtualArray(
      parentFieldName,
      parent,
      parentFeature,
      parentEntity,
    );

    returnEntity = convertChildrenToArrayProxy(
      returnEntity,
      parentFieldName,
      child,
      childDefinition,
      ArrayProxySignals,
    );

    // update the parent signal from parent
    return returnEntity;
  });
}
