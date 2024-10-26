/**
 * Defines the structure of a partial array
 * used to create a virtual array.
 */
export interface PartialArrayDefinition {
  /** starting index for the ids to be filled into the virtual array */
  startIndex: number;
  /** the ids to put into the virtual array */
  indexes: string[];
  /** the total number of ids in the virtual array */
  length: number;
}
