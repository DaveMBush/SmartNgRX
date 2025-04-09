import { SmartNgRXRowBase } from '@smarttools/core';

/**
 * Interface that allows us to access the rawArray field and
 * the addToStore and removeFromStore methods on a `SmartArray`
 */
export interface SmartArray<
  P extends object = object,
  C extends SmartNgRXRowBase = SmartNgRXRowBase,
> {
  length: number;
  /**
   * The array of IDs proxied by the `ArrayProxy`
   */
  getIdAtIndex?(index: number): string | undefined;
  /**
   * Adds a new row to the store
   *
   * @param newRow The new row to add
   * @param thisRow The parent row
   */
  addToStore?(newRow: C, thisRow: P): void;
  /**
   * Removes a row from the store
   *
   * @param row
   * @param parent
   */
  removeFromStore?(row: C, parent: P): void;

  [key: number]: C | string;
}
