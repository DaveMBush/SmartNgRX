import { computed, Signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';

import { SignalsFacade } from '../facades/signals-facade';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { convertChildrenToVirtualArray } from '../smart-selector/convert-children-to-virtual-array.function';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { convertSignalChildrenToArrayProxy } from './convert-signal-children-to-array-proxy.function';

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
  childDefinition: ChildDefinition<P, C>,
): Signal<EntityState<P>> {
  const {
    childFeature,
    childEntity,
    parentFeature,
    parentEntity,
    parentField: parentFieldName,
  } = childDefinition;
  // find the child entity from the actionService
  const childService = facadeRegistry.register(
    childFeature,
    childEntity,
    true,
  ) as SignalsFacade<C>;
  childDefinitionRegistry.registerChildDefinition(
    childFeature,
    childEntity,
    childDefinition,
  );

  return computed(function createInnerSmartComputedSignal() {
    const parent = parentSignal();

    const childState = childService.entityState;
    const child = childState.entityState();

    convertChildrenToVirtualArray(
      parentFieldName,
      parent,
      parentFeature,
      parentEntity,
    );

    const returnEntity = convertSignalChildrenToArrayProxy(
      parent,
      parentFieldName,
      child,
      childDefinition,
    );

    // update the parent signal from parent
    return returnEntity;
  });
}
