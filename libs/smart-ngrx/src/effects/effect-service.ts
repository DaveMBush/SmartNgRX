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
   * Loads the rows represented by the array of ids passed in.
   */
  abstract loadByIds: (ids: string[]) => Observable<T[]>;

  abstract update: (oldRow: T, newRow: T) => Observable<T[]>;
}
