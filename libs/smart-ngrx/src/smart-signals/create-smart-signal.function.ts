/* eslint-disable @smarttools/one-exported-item-per-file -- needed for overloads */
import { computed, Signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';

import { SignalsFacade } from '../facades/signals-facade';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { createInnerSmartSignal } from './create-inner-smart-signal.function';

// First overload - returns a function that creates the signal when called
export function createSmartSignal<P extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
): () => Signal<EntityState<P>>;

// Second overload - now accepts a parent signal factory
export function createSmartSignal<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  parent: () => Signal<EntityState<P>>,
  children: ChildDefinition<P, T>[],
): () => Signal<EntityState<P>>;

/**
 * Creates a smart signal that can be used to create a signal for a
 * parent and child relationship or retrieves the signal for a top level
 * entity.
 *
 * @param p1 The feature name of the top level entity or a signal factory for the parent.
 * @param p2 The entity name of the top level entity or the child definitions to create the smart signal for.
 *
 * You can only use two strings or the parent signal factory and child definitions. Any other
 * combination will throw an error.
 *
 * @returns A signal that can be used to create a signal for a parent and child relationship.
 */
export function createSmartSignal<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  p1: string | (() => Signal<EntityState<P>>),
  p2: ChildDefinition<P, T>[] | string,
): () => Signal<EntityState<P>> {
  // Handle the feature/entity case (first overload)
  if (typeof p1 === 'string' && typeof p2 === 'string') {
    const feature = p1;
    const entity = p2;

    return function createEntityStateSignal(): Signal<EntityState<P>> {
      const facade = facadeRegistry.register(
        feature,
        entity,
        true,
      ) as SignalsFacade<P>;

      // Create new signal
      const parentSignal = computed(function entityStateAdapter() {
        return {
          ids: facade.entityState.ids(),
          entities: facade.entityState.entityMap(),
        } as EntityState<P>;
      });

      return parentSignal;
    };
  }

  // Handle parent/child case (second overload) - now handles parent signal factory
  if (typeof p1 === 'function' && Array.isArray(p2)) {
    const parentSignalFactory = p1;
    const children = p2;

    return function createChildEntityStateSignal(): Signal<EntityState<P>> {
      const parentSignal = parentSignalFactory();
      return children.reduce(createSmartSignalChildReducer<P, T>, parentSignal);
    };
  }

  throw new Error('Invalid arguments');
}

function createSmartSignalChildReducer<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  parentSignal: Signal<EntityState<P>>,
  childDefinition: ChildDefinition<P, T>,
): Signal<EntityState<P>> {
  return createInnerSmartSignal(parentSignal, childDefinition);
}
