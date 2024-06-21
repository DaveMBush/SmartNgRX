import { Observable } from 'rxjs';

/**
 * This is the abstract class that all services the Effects
 * use must implement.
 */
export abstract class EffectService<T> {
  /**
   * Loads the rows represented by the array of ids passed in from the server
   */
  abstract loadByIds(ids: string[]): Observable<T[]>;

  /**
   * Sends the updated row in the store to the server.
   */
  abstract update(newRow: T): Observable<T[]>;

  /**
   * Sends a new row to the server
   */
  abstract add(row: T): Observable<T[]>;

  /**
   * Deletes the row represented by the id from the server
   */
  abstract delete(id: string): Observable<void>;
}
