import {
  ensureDataLoaded,
  entityDefinitionRegistry,
  entityRegistry,
  FacadeBase,
  featureRegistry,
  isNullOrUndefined,
  ParentInfo,
  PartialArrayDefinition,
  SmartNgRXRowBase,
  Update as UpdateService,
  UpdateStr,
} from '@smarttools/smart-core';
import { asapScheduler } from 'rxjs';

import { Add } from './add.class';
import { entitySignalStoreFactory } from './entity-signal-store.factory';
import { LoadByIdsSignals } from './load-by-ids-signals.class';
import { LoadByIndexesSignals } from './load-by-indexes-signals.class';
import { removeIdFromParentsSignals } from './remove-id-from-parents-signals.function';

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
   * Force Dirty for Signals
   *
   * @param ids the ids to force dirty
   */
  override forceDirty(ids: string[]): void {
    this.markDirtyWithEntities(this.entityState.entityState().entities, ids);
  }

  /**
   * Mark Dirty for Signals
   *
   * @param ids the ids to mark as dirty
   */
  override markDirty(ids: string[]): void {
    // if this is the initial row, we have to re-fetch the
    // main row so that we have the most recent data
    // or is will eventually be removed from the store.
    if (this.entityDefinition.isInitialRow === true) {
      this.loadByIds(ids[0]);
      return;
    }
    this.forceDirty(ids);
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
  override removeFromParents(id: string): ParentInfo[] {
    return super.removeFromParentsWithFunction(id, removeIdFromParentsSignals);
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
