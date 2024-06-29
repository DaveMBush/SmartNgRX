import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

export interface SmartArray<
  P extends object = object,
  C extends SmartNgRXRowBase = SmartNgRXRowBase,
> {
  rawArray?: string[];
  addToStore?(newRow: C, thisRow: P): void;
  removeFromStore?(row: C, parent: P): void;
}
