import { SmartNgRXRowBase } from '@smarttools/core';

/**
 * Interface for `Actions` that take a row property
 *
 * @see `actionFactory`
 */
export interface RowProp<T extends SmartNgRXRowBase> {
  row: T;
}
