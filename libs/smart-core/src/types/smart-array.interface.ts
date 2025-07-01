import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

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
   * The id of the row at position index.
   * If the row does not exist yet, we return undefined.
   * If we are retrieving to id from the server, the id
   * will be index-${index} as a temporary placeholder.
   *
   * @param index The index of the row
   * @returns The id of the row at position index or undefined if we don't have the id yet
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

  add?(newRow: C, thisRow: P): void;

  [key: number]: C | string;
}
