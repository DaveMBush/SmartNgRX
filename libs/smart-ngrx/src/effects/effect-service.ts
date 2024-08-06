import { Observable } from 'rxjs';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';

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
   * Loads the rows represented by the array of ids passed in from the server
   *
   * @param parentId the id of the parent row
   * @param startIndex the index to start loading from
   * @param length the number of rows to load
   * @returns the virtual array contents
   */
  abstract loadByIndexes(parentId: string, childField: string, startIndex: number, length: number): Observable<PartialArrayDefinition>;

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
