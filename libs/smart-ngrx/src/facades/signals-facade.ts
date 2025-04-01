import { UpdateStr } from '@ngrx/entity/src/models';
import { asapScheduler, catchError, of } from 'rxjs';

import { forNext } from '../common/for-next.function';
import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { handleError } from '../error-handler/handle-error.function';
import { entityRowsRegistry } from '../mark-and-delete/entity-rows-registry.class';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { serviceRegistry } from '../registrations/service-registry.class';
import { ensureDataLoaded } from '../smart-selector/ensure-data-loaded.function';
import { virtualArrayMap } from '../smart-selector/virtual-array-map.const';
import { ParentInfo } from '../types/parent-info.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { Add } from './classic-ngrx.facade/add.class';
import { markFeatureParentsDirty } from './classic-ngrx.facade/mark-feature-parents-dirty.function';
import { Update as UpdateService } from './classic-ngrx.facade/update.class';
import { FacadeBase } from './facade.base';
import { entitySignalStoreFactory } from './signal-facade/entity-signal-store.factory';
import { LoadByIdsSignals } from './signal-facade/load-by-ids-signals.class';
import { LoadByIndexesSignals } from './signal-facade/load-by-indexes-signals.class';
import { removeIdFromParentsSignals } from './signal-facade/remove-id-from-parents-signals.function';

/**
 * The SignalsFacade is the main interface for
 * the SmartNgRX Signals based store
 */
export class SignalsFacade<
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
> extends FacadeBase<T> {
  private loadByIdsService!: LoadByIdsSignals<T>;
  private loadByIndexesService!: LoadByIndexesSignals<T>;

  override brand = 'signal' as const;

  entityState!: ReturnType<typeof entitySignalStoreFactory<T>>;

  /**
   * Initialization code for the facade
   *
   * @returns true if the facade is initialized successfully
   */
  override init(): boolean {
    if (this.initCalled) {
      return true;
    }
    this.initCalled = true;
    // init code as needed here
    if (!featureRegistry.hasFeature(this.feature)) {
      console.error(
        `Feature ${this.feature} not found when called using ${this.entity}`,
      );
      return false;
    }
    this.entityDefinition = entityDefinitionRegistry(this.feature, this.entity);
    this.selectId = this.entityDefinition.selectId!;
    this.entityState = entitySignalStoreFactory(this);

    this.initClasses();

    const registry = entityRegistry.get(this.feature, this.entity);

    this.markDirtyFetchesNew =
      isNullOrUndefined(registry.markAndDeleteInit.markDirtyFetchesNew) ||
      registry.markAndDeleteInit.markDirtyFetchesNew;

    this.loadByIdsService.init(this.entityDefinition.defaultRow);
    this.loadByIndexesService.init();
    this.updateService.init();
    this.addService.init();
    if (this.entityDefinition.isInitialRow === true) {
      const context = this;
      asapScheduler.schedule(function watchInitialRowSchedule() {
        ensureDataLoaded(
          context.entityState.entityState(),
          '1',
          context.feature,
          context.entity,
        );
      });
    }

    return true;
  }

  /**
   * Mark Dirty for Signals
   *
   * @param ids the ids to mark as dirty
   */
  override markDirty(ids: string[]): void {
    const feature = this.feature;
    const entity = this.entity;
    if (!this.markDirtyFetchesNew) {
      const entIds = this.entityState.entityState().entities as Record<
        string,
        SmartNgRXRowBase
      >;
      const idsIds = [] as SmartNgRXRowBase[];
      forNext(ids, function markDirtyForNext(id) {
        idsIds.push(entIds[id]);
      });
      entityRowsRegistry.register(feature, entity, idsIds);
      return;
    }
    this.forceDirty(ids);
  }

  /**
   * Force Dirty for Signals
   *
   * @param ids the ids to force dirty
   */
  override forceDirty(ids: string[]): void {
    this.markDirtyWithEntities(this.entityState.entityState().entities, ids);
  }

  /**
   * Mark Not Dirty for Signals
   *
   * @param id the id to mark as not dirty
   */
  override markNotDirty(id: string): void {
    this.updateMany([
      {
        id,
        changes: { isDirty: false },
      },
    ] as UpdateStr<T>[]);
  }

  /**
   * Garbage Collect for Signals
   *
   * @param ids the ids to garbage collect
   */
  override garbageCollect(ids: string[]): void {
    this.garbageCollectWithEntities(
      this.entityState.entityState().entities,
      ids,
    );
  }

  /**
   * Remove for Signals
   *
   * @param ids the ids to remove
   */
  override remove(ids: string[]): void {
    this.entityState.remove(ids);
  }

  /**
   * Update for Signals
   *
   * @param oldRow the old row
   * @param newRow the new row
   */
  override update(oldRow: SmartNgRXRowBase, newRow: SmartNgRXRowBase): void {
    this.optimisticUpdate(oldRow, newRow);
    this.updateService.update(oldRow, newRow);
  }

  /**
   * Update Many for Signals
   *
   * @param changes the changes to update
   */
  override updateMany(changes: UpdateStr<T>[]): void {
    this.entityState.updateMany(changes);
  }

  /**
   * Add for Signals
   *
   * @param row the row to add
   * @param parentId the parent id
   * @param parentService the parent service
   */
  override add(row: T, parentId: string, parentService: FacadeBase): void {
    this.addService.add(row, parentId, parentService);
  }

  /**
   * Delete for Signals
   *
   * @param id the id to delete
   */
  override delete(id: string): void {
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

  /**
   * Load By Ids for Signals
   *
   * @param ids the ids to load
   */
  override loadByIds(ids: string): void {
    this.loadByIdsService.loadByIds(ids);
  }

  /**
   * Load By Ids Preload for Signals
   *
   * @param ids the ids to load
   */
  override loadByIdsPreload(ids: string[]): void {
    this.loadByIdsService.loadByIdsPreload(ids);
  }

  /**
   * Load By Ids Success for Signals
   *
   * @param rows the rows to load
   */
  override loadByIdsSuccess(rows: T[]): void {
    this.loadByIdsService.loadByIdsSuccess(rows);
  }

  /**
   * Load By Indexes for Signals
   *
   * @param parentId the parent id
   * @param childField the child field
   * @param index the index
   */
  override loadByIndexes(
    parentId: string,
    childField: string,
    index: number,
  ): void {
    this.loadByIndexesService.loadByIndexes(parentId, childField, index);
  }

  /**
   * Load By Indexes Success for Signals
   *
   * @param parentId the parent id
   * @param childField the child field
   * @param array the array
   */
  override loadByIndexesSuccess(
    parentId: string,
    childField: string,
    array: PartialArrayDefinition,
  ): void {
    this.loadByIndexesService.loadByIndexesSuccess(parentId, childField, array);
  }

  /**
   * Upserts a row into the store
   *
   * @param row the row to upsert
   */
  override upsertRow(row: T): void {
    this.entityState.upsert(row);
  }

  /**
   * This saves the rows to the store
   *
   * @param rows the rows to save
   */
  storeRows(rows: T[]): void {
    this.entityState.storeRows(rows);
  }

  /**
   * removes the id from the child arrays of the parent rows
   *
   * @param id the id to remove
   * @returns the parent info for each parent
   */
  private removeFromParents(id: string): ParentInfo[] {
    const childDefinitions = childDefinitionRegistry.getChildDefinition(
      this.feature,
      this.entity,
    );
    const parentInfo: ParentInfo[] = [];
    forNext(
      childDefinitions,
      function removeFromParentsForNext(childDefinition) {
        removeIdFromParentsSignals(childDefinition, id, parentInfo);
      },
    );
    return parentInfo;
  }

  private markDirtyWithEntities<R extends SmartNgRXRowBase>(
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
        } as UpdateStr<T>;
      });
    this.updateMany(updates);
  }

  private garbageCollectWithEntities<R extends SmartNgRXRowBase>(
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
  private optimisticUpdate(
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
    this.updateMany([{ id: id.toString(), changes }] as UpdateStr<T>[]);
  }

  private initClasses(): void {
    this.loadByIndexesService = new LoadByIndexesSignals(this);
    this.loadByIdsService = new LoadByIdsSignals(this);
    this.updateService = new UpdateService<T>(
      this.feature,
      this.entity,
      this.selectId as (row: T) => string,
      this.loadByIdsSuccess.bind(this),
    );
    this.addService = new Add<T>(this);
  }
}
