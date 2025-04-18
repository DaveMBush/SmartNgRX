/**
 * Interface for `Actions` that take an array of indexes
 *
 * @see `actionFactory`
 */

export interface IndexProp {
  index: number;
  parentId: string;
  childField: string;
}
