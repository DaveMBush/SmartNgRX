import { Signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/core';

import { SmartNgRXRowBaseSelector } from './smart-ngrx-row-base-selector.type';

/**
 * The definition of how to access the child data from a parent entity.
 */
interface NgRXChildDefinition<
  P extends SmartNgRXRowBase = SmartNgRXRowBase,
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
> {
  /**
   * The name of the feature that contains the child data.
   */
  childFeature: string;
  /**
   * The fieldName we used to register the entity in the provider.
   */
  childEntity: string;
  /**
   *  The selector to retrieve the child data from the store.
   */
  childSelector: SmartNgRXRowBaseSelector<T>;

  /**
   * The name of the field in the parent that contains the child IDs
   */
  parentField: keyof P;

  /**
   * The feature the parent entity is in
   */
  parentFeature: string;
  /**
   * The name of the parent entity
   * The parentFeature and parentEntity allow us to get access
   * to the parent adapter and other things we need
   * to add and delete items from the parent entity
   */
  parentEntity: string;
}

interface SmartSignalChildSelector {
  childSelector: Signal<EntityState<SmartNgRXRowBase>>;
}

type SmartSignalChildDefinition<
  P extends SmartNgRXRowBase = SmartNgRXRowBase,
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
> = Omit<NgRXChildDefinition<P, T>, 'childSelector'> & SmartSignalChildSelector;

interface NgRXType {
  type: 'NgRX';
}

interface SignalType {
  type: 'Signal';
}

export type ChildDefinition<
  P extends SmartNgRXRowBase = SmartNgRXRowBase,
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
> =
  | (NgRXChildDefinition<P, T> & NgRXType)
  | (SignalType & SmartSignalChildDefinition<P, T>);
