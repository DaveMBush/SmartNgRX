/**
 * Used to define the array of parents for a child
 * this is used to help remove an id from the parent's
 * child field.
 */
export interface ParentInfo {
  /**
   * The name of the feature this parent is in.
   */
  feature: string;
  /**
   * The name of the entity for this parent.
   */
  entity: string;
  /**
   * List of parent row IDs that have the child.
   */
  ids: string[];
}
