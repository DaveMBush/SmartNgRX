/**
 * Provides an interface we can use to access the delete method on a row
 * once it has been wrapped with a `RowProxy`
 */
export interface RowProxyDelete {
  /**
   * This deletes the row from the store and the server
   */
  delete?(): void;
}
