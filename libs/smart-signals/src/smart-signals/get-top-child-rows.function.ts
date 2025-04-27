import { computed, Signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/core';

/**
 * This function returns the rows of the child that a top level
 * createSmartSignal loads on your behalf.
 *
 * @param parentSignal The signal that createSmartSignal loads on your behalf.
 * @param childFieldName The field name of the child that you want to get the rows of.
 * @returns A signal that emits the rows of the child.
 */
export function getTopChildRows<P extends object, C extends SmartNgRXRowBase>(
  parentSignal: Signal<EntityState<P>>,
  childFieldName: keyof P,
): Signal<C[]> {
  return computed(function getTopChildRowsComputed() {
    const parentState = parentSignal();
    if (parentState.ids.length === 1) {
      const topEntity = parentState.entities[parentState.ids[0]];
      if (
        topEntity &&
        (topEntity[childFieldName] as C[]).length > 0 &&
        typeof (topEntity[childFieldName] as C[])[0] === 'object'
      ) {
        return topEntity[childFieldName] as C[];
      }
    }
    return [] as C[];
  });
}
