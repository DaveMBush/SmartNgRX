import { UpdateStr } from '@ngrx/entity/src/models';
import { asapScheduler, catchError, of } from 'rxjs';

import { forNext } from '../common/for-next.function';
import { handleError } from '../error-handler/handle-error.function';
import { entityRowsRegistry } from '../mark-and-delete/entity-rows-registry.class';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { serviceRegistry } from '../registrations/service-registry.class';
import { virtualArrayMap } from '../smart-selector/virtual-array-map.const';
import { ChildDefinition } from '../types/child-definition.interface';
import { ParentInfo } from '../types/parent-info.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { SmartValidatedEntityDefinition } from '../types/smart-validated-entity-definition.type';
import { Add } from './classic-ngrx.facade/add.class';
import { markFeatureParentsDirty } from './classic-ngrx.facade/mark-feature-parents-dirty.function';
import { Update } from './classic-ngrx.facade/update.class';

/**
 * Base class for ActionService that defines the interface for all action services
 */
export abstract class FacadeBase<T extends SmartNgRXRowBase = SmartNgRXRowBase> {
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
  add(row: T, parentId: string, parentService: FacadeBase): void {
    this.addService.add(row, parentId, parentService);
  }

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

  /**
   * Deletes the row represented by the Id from the store
   *
   * @param id the id of the row to delete
   */
  delete(id: string): void {
    let parentInfo = this.removeFromParents(id);

    parentInfo = parentInfo.filter(function filterParentInfo(info) {
      return info.ids.length > 0;
    });
    const effectService = serviceRegistry.get(
      this.entityDefinition.effectServiceToken,
    );
    effectService
      .delete(id)
      .pipe(
        catchError(function deleteEffectConcatMapCatchError(
          error: unknown,
          __,
        ) {
          handleError(
            'Error deleting row, refreshing the parent row(s)',
            error,
          );
          markFeatureParentsDirty({
            id,
            parentInfo,
          });
          return of();
        }),
      )
      .subscribe();
  }

  protected markDirtyNoFetchWithEntities<R extends SmartNgRXRowBase>(
    entities: Record<string, R>,
    ids: string[],
  ): void {
    const entIds = entities as Record<string, SmartNgRXRowBase>;
    const idsIds = [] as SmartNgRXRowBase[];
    forNext(ids, function markDirtyForNext(id) {
      idsIds.push(entIds[id]);
    });
    entityRowsRegistry.register(this.feature, this.entity, idsIds);
  }

  protected garbageCollectWithEntities<R extends SmartNgRXRowBase>(
    entities: Record<string, R>,
    ids: string[],
  ): void {
    const feature = this.feature;
    const entity = this.entity;
    let idsToRemove = ids.filter(function filterGarbageCollectIds(id) {
      return entities[id] !== undefined && entities[id].isEditing !== true;
    });
    if (idsToRemove.length === 0) {
      return;
    }
    idsToRemove = entityRowsRegistry.unregister(feature, entity, ids);
    this.remove(idsToRemove);
    // make sure we remove the virtualArray from the map AFTER
    // we remove the row from the store
    asapScheduler.schedule(function garbageCollectSchedule() {
      idsToRemove.forEach(function garbageCollectForEach(id) {
        virtualArrayMap.remove(feature, entity, id);
      });
    });
  }

  /**
   * Optimistically updates the row in the store
   * based on the diff between the old row and the new row
   *
   * @param oldRow the row before the changes
   * @param newRow the row after the changes
   */
  protected optimisticUpdate(
    oldRow: SmartNgRXRowBase,
    newRow: SmartNgRXRowBase,
  ): void {
    const changes: Record<string, unknown> = {};
    const newRowAsRecord = newRow as unknown as Record<string, unknown>;
    const oldRowAsRecord = oldRow as unknown as Record<string, unknown>;
    Object.entries(newRowAsRecord).forEach(function updateForEach([
      key,
      value,
    ]) {
      if (value !== oldRowAsRecord[key]) {
        changes[key] = value;
      }
    });
    const id = this.selectId(oldRow as T);
    this.updateMany([{ id: id.toString(), changes }]);
  }

  protected markDirtyWithEntities<R extends SmartNgRXRowBase>(
    entities: Record<string, R>,
    ids: string[],
  ): void {
    const updates = ids
      .filter(function filterMarkDirtyIds(id) {
        return entities[id] !== undefined && entities[id].isEditing !== true;
      })
      .map(function mapMarkDirtyIds(id) {
        const entityChanges: Partial<SmartNgRXRowBase> = {
          isDirty: true,
        };

        return {
          id,
          changes: entityChanges,
        } as UpdateStr<SmartNgRXRowBase>;
      });
    this.updateMany(updates);
  }

  /**
   * removes the id from the child arrays of the parent rows
   *
   * @param id the id to remove
   * @returns the parent info for each parent
   */
  abstract removeFromParents(id: string): ParentInfo[];

  protected removeFromParentsWithFunction(
    id: string,
    removeIdFromParents: (
      childDefinition: ChildDefinition,
      itemId: string,
      pInfo: ParentInfo[],
    ) => void,
  ): ParentInfo[] {
    const childDefinitions = childDefinitionRegistry.getChildDefinition(
      this.feature,
      this.entity,
    );
    const parentInfo: ParentInfo[] = [];
    forNext(
      childDefinitions,
      function removeFromParentsForNext(childDefinition) {
        removeIdFromParents(childDefinition, id, parentInfo);
      },
    );
    return parentInfo;
  }
}
