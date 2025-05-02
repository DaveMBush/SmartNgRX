/* eslint-disable @smarttools/one-exported-item-per-file -- needed for overloads */
import { computed, Signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import {
  assert,
  facadeRegistry,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';

import { SignalsFacade } from '../signal-facade/signals-facade';
import { ChildDefinitionSignals } from '../types/child-definition-signals.interface';
import { createInnerSmartSignal } from './create-inner-smart-signal.function';

function isSignal(value: unknown): boolean {
  return typeof value === 'function';
}

// First overload - returns a function that creates the signal when called
export function createSmartSignal<P extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
): Signal<EntityState<P>>;

// Second overload - now accepts a parent signal factory
export function createSmartSignal<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  parentSignal: Signal<EntityState<P>>,
  children: ChildDefinitionSignals<P, T>[],
): Signal<EntityState<P>>;

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
  p1: Signal<EntityState<P>> | string,
  p2?: ChildDefinitionSignals<P, T>[] | string,
): Signal<EntityState<P>> {
  // Handle the feature/entity case (first overload)
  if (typeof p1 === 'string' && typeof p2 === 'string') {
    const feature = p1;
    const entity = p2;

    const facade = facadeRegistry.register(feature, entity) as SignalsFacade<P>;

    // Create new signal
    const parentSignal = computed(function entityStateAdapter() {
      return {
        ids: facade.entityState.ids(),
        entities: facade.entityState.entityMap(),
      } as EntityState<P>;
    });

    return parentSignal;
  }

  // Handle parent/child case (second overload) - now handles parent signal factory
  if (isSignal(p1) && Array.isArray(p2)) {
    const children = p2;
    const parent = p1 as Signal<EntityState<P>>;

    // verify that the parentFeature and parentEntity are the same for all children
    const parentFeature = children[0].parentFeature;
    const parentEntity = children[0].parentEntity;

    const allSame = children.every(function childHasSameParent(child) {
      return (
        child.parentFeature === parentFeature &&
        child.parentEntity === parentEntity
      );
    });
    assert(
      allSame,
      'All children must have the same parentFeature and parentEntity',
    );

    return children.reduce(createSmartSignalChildReducer<P, T>, parent);
  }

  throw new Error('Invalid arguments');
}

function createSmartSignalChildReducer<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(
  parentSignal: Signal<EntityState<P>>,
  childDefinition: ChildDefinitionSignals<P, T>,
): Signal<EntityState<P>> {
  return createInnerSmartSignal(parentSignal, childDefinition);
}
