import { MarkAndDeleteInit } from './mark-and-delete-init.interface';
import { SmartNgRXRowBase } from './smart-ngrx-row-base.interface';

/**
 * This is an internal interface that holds
 * all the attributes we will need in
 * provideEntities() so that we can just do
 * a lookup for them later when we need them.
 */
export interface EntityAttributes {
  /**
   * Function that defines the default row for the entity
   *
   * @param id the unique ID of the row
   */
  defaultRow(id: string): SmartNgRXRowBase;
  /**
   * Definition of how we want to handle refresh and garbage collection
   *
   * @see `MarkAndDeleteInit`
   */
  markAndDeleteInit: MarkAndDeleteInit;
  /**
   * ??
   */
  markAndDeleteEntityMap: Map<string, number>;
}
