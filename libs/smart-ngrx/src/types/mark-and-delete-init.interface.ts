/**
 * this is the interface used to initialize the mark and delete functionality
 * at the global or feature level
 */
export interface MarkAndDeleteInit {
  /**
   * the time in milliseconds to wait before marking a row as dirty
   * when a row is marked as dirty, and it is being used it will
   * refresh the row.  If `markDirtyFetchesNew` is true, it will
   * retrieve a new row from the server.  If `markDirtyFetchesNew`
   * is false, it will just refresh the row and reset the dirty
   * timeout internally.  This is how we know the row is still in use,
   * or not.
   *
   * If `markDirtyTime` is set to -1, then the row will never be
   * marked as dirty, `removeTime` will be ignored. If you manually
   * mark a row as dirty, the system will assume you want to refetch
   * the row from the server, regardless of what you set here. This
   * allows us to use the same mechanism to refresh data for automated
   * refreshes and manual refreshes in response to websocket notification.
   *
   * If `markAndDelete` is not set, it will default to 15 minutes.
   */
  markDirtyTime: number;
  /**
   * If this is set to true, than any time a row is marked as dirty
   * the system will retrieve a new value from the server. Otherwise,
   * it will just reset the dirty timeout internally.
   */
  markDirtyFetchesNew: boolean;
  /**
   * the time in milliseconds to wait before removing a row from the
   * store. `removeTime` must be greater than `markDirtyTime` and will
   * be ignored if it is less than `markDirtyTime` or if `markDirtyTime`
   * is set to -1.
   */
  removeTime: number;
  /**
   * the time in milliseconds that determines how often the system looks
   * at the rows to see if they need to be marked dirty or removed. If
   * this is not set, it will default to one minute.
   *
   * runInterval is only recognized at the global level. If you want to
   * change it, you must change it at the global level.
   */
  runInterval: number;
}
