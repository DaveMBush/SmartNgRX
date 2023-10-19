import { MarkAndDelete } from './mark-and-delete.interface';

/**
 * This is an interface that holds all the attributes we will
 * need in provideEntities() so that we can just do a lookup
 * for them later when we need them.
 */
export interface EntityAttributes {
  /**
   * Function that defines the default row for the entity
   * @param id the unique ID of the row
   */
  defaultRow(id: string): MarkAndDelete;
}
