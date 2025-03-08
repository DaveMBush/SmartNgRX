import { UpdateStr } from '@ngrx/entity/src/models';

import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { SmartValidatedEntityDefinition } from '../types/smart-validated-entity-definition.type';
import { Update } from './classic-ngrx.facade/update.class';
import { Add } from './classic-ngrx.facade/add.class';

/**
 * Base class for ActionService that defines the interface for all action services
 */
export abstract class FacadeBase<
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
> {
  brand: 'classic' | 'signal' = 'classic' as const;
  protected entityDefinition!: SmartValidatedEntityDefinition<T>;

  protected initCalled = false;
  protected markDirtyFetchesNew = true;
  protected updateService!: Update<T>;
  protected addService!: Add<T>;

  selectId!: (row: T) => string;

  /**
   * Creates an instance of ActionServiceBase
   *
   * @param feature The feature name
   * @param entity The entity name
   */
  constructor(
    public feature: string,
    public entity: string,
  ) {}

  /**
   * Initializes the action service
   */
  abstract init(): boolean;

  /**
   * Marks entities as dirty
   *
   * @param ids IDs of entities to mark as dirty
   */
  abstract markDirty(ids: string[]): void;
  abstract markNotDirty(id: string): void;

  /**
   * Forces entities to be marked as dirty
   *
   * @param ids IDs of entities to force mark as dirty
   */
  abstract forceDirty(ids: string[]): void;

  // /**
  //  * Marks entities as not dirty
  //  *
  //  * @param ids IDs of entities to mark as not dirty
  //  */
  // abstract markNotDirty(ids: string[]): void;

  /**
   * Performs garbage collection on entities
   *
   * @param ids IDs of entities to garbage collect
   */
  abstract garbageCollect(ids: string[]): void;

  /**
   * Removes entities from the store
   *
   * @param ids IDs of entities to remove
   */
  abstract remove(ids: string[]): void;

  /**
   * Updates an entity in the store
   *
   * @param oldRow The original entity
   * @param newRow The updated entity
   */
  abstract update(oldRow: SmartNgRXRowBase, newRow: SmartNgRXRowBase): void;

  /**
   * Updates multiple entities in the store
   *
   * @param changes The changes to apply
   */
  abstract updateMany(changes: UpdateStr<SmartNgRXRowBase>[]): void;

  /**
   * Adds a new entity to the store
   *
   * @param row The entity to add
   * @param parentId The parent entity ID
   * @param parentService The parent entity's action service
   */
  abstract add(row: T, parentId: string, parentService: FacadeBase): void;

  /**
   * Deletes an entity from the store
   *
   * @param id The ID of the entity to delete
   */
  abstract delete(id: string): void;

  /**
   * Loads entities by their IDs
   *
   * @param ids The IDs to load
   */
  abstract loadByIds(ids: string): void;

  /**
   * Preloads entities by their IDs
   *
   * @param ids The IDs to preload
   */
  abstract loadByIdsPreload(ids: string[]): void;

  /**
   * Handles successful entity loading
   *
   * @param rows The loaded entities
   */
  abstract loadByIdsSuccess(rows: SmartNgRXRowBase[]): void;

  /**
   * Loads entities by their indexes
   *
   * @param parentId The parent entity ID
   * @param childField The child field name
   * @param index The index to load
   */
  abstract loadByIndexes(
    parentId: string,
    childField: string,
    index: number,
  ): void;

  /**
   * Handles successful index-based entity loading
   *
   * @param parentId The parent entity ID
   * @param childField The child field name
   * @param array The partial array definition
   */
  abstract loadByIndexesSuccess(
    parentId: string,
    childField: string,
    array: PartialArrayDefinition,
  ): void;

  abstract upsertRow(row: T): void;
}
