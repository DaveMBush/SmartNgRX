import { Observable } from 'rxjs';

/**
 * This is the abstract class that all services the Effects
 * use must implement.
 */
export abstract class EffectService<T> {
  /**
   * Used to load ALL the rows from the server for the given entity.
   */
  abstract load: () => Observable<T[]>;
  /**
   * Loads the rows represented by the array of ids passed in from the server
   */
  abstract loadByIds: (ids: string[]) => Observable<T[]>;

  /**
   * Sends the updated row in the store to the server.
   */
  abstract update: (oldRow: T, newRow: T) => Observable<T[]>;

  /**
   * Sends a new row to the server
   */
  abstract add: (row: T) => Observable<T[]>;
}
