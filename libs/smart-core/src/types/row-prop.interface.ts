import { SmartNgRXRowBase } from './smart-ngrx-row-base.interface';

/**
 * Interface for `Actions` that take a row property
 *
 * @see `actionFactory`
 */
export interface RowProp<T extends SmartNgRXRowBase> {
  row: T;
}
