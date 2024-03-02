/**
 * This interface should be used by any interface that
 * represents an entity in the store that uses the
 * Smart NgRX library.
 */
export interface SmartNgRXRowBase {
  /**
   * Flag that indicates that the row is dirty. This is used
   * internally by the mark and delete functionality.
   */
  isDirty?: boolean;
  /**
   * Flag that indicates that the row is a placeholder. You might
   * want to use this to indicate that the row is being loaded by,
   * for example, displaying skeleton rows via CSS.
   */
  isLoading?: boolean;
  /**
   * This flag indicates that the row is currently being added
   * this is used internally.
   */
  isAdding?: boolean;
}
