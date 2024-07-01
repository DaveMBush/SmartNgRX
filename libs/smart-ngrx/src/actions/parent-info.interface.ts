/**
 * Used to define the array of parents for a child
 * this is used to help remove an id from the parent's
 * child field.
 */
export interface ParentInfo {
  feature: string;
  entity: string;
  ids: string[];
}
