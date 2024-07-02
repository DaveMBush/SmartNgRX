import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

/**
 * Interface that allows us to access the rawArray field and the addToStore and removeFromStore
 * methods on a `SmartArray`
 */
export interface SmartArray<
  P extends object = object,
  C extends SmartNgRXRowBase = SmartNgRXRowBase,
> {
  rawArray?: string[];
  addToStore?(newRow: C, thisRow: P): void;
  removeFromStore?(row: C, parent: P): void;
}
