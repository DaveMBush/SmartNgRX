import { Signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { BaseChildDefinition, SmartNgRXRowBase } from '@smarttools/core';

/**
 * The definition of how to access the child data from a parent entity.
 */
export interface ChildDefinitionSignals<
  P extends SmartNgRXRowBase = SmartNgRXRowBase,
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
> extends BaseChildDefinition<P> {
  /**
   *  The selector to retrieve the child data from the store.
   */
  childSelector: Signal<EntityState<T>>;
}
