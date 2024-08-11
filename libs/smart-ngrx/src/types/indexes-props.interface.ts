/**
 * Interface for `Actions` that take an array of indexes
 *
 * @see `actionFactory`
 */

export interface IndexesProp {
  indexes: number[];
  parentId: string;
  childField: string;
}
