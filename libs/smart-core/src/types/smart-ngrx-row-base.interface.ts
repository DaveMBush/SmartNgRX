/**
 * This interface should be used by any interface that
 * represents an entity in the store that uses the
 * Smart NgRX library.
 */
export interface SmartNgRXRowBase {
  /**
   * All rows need an id field that is a string
   */
  id: string;
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
   * We use parentId to store the parentId of this row while we are adding it
   * and to indicate that we are in adding mode. This is used internally.
   */
  parentId?: string;

  /**
   * This flag indicates that the row is currently being edited
   * this is used internally.
   */

  isEditing?: boolean;
}
