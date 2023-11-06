/**
 * This interface should be used by any interface that
 * represents an entity in the store that uses the
 * Smart NgRX library. You will not otherwise need to
 * access this field in your own code as the dirty or
 * not dirty status is handled by the Smart NgRX code
 * for you.
 */
export interface MarkAndDelete {
  isDirty?: boolean;
}
