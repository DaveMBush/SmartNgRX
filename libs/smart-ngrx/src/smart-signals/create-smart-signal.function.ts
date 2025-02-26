import { Signal } from '@angular/core';
import { Dictionary, EntityState } from '@ngrx/entity';

import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

/**
 *
 * @param parentSignal
 * @param children
 */
export function createSmartSignal<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(parentSignal: Signal<EntityState<P>>, children: ChildDefinition<P, T>[]): Signal<EntityState<P>> {
  return children.reduce(createSmartSignalChildReducer<P, T>, parentSignal);
}

function createSmartSignalChildReducer<
  P extends SmartNgRXRowBase,
  T extends SmartNgRXRowBase,
>(parentSignal: Signal<T>, childDefinition: ChildDefinition<P, T>) {
  return createInnerSmartSignal(parentSignal, childDefinition.selector);
}
