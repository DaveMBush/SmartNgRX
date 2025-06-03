import { Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { UpdateStr } from '@ngrx/entity/src/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  entityDefinitionRegistry,
  entityRegistry,
  FacadeBase,
  featureRegistry,
  isNullOrUndefined,
  ParentInfo,
  PartialArrayDefinition,
  SmartNgRXRowBase,
  Update,
} from '@smarttools/smart-core';
import { Observable, take } from 'rxjs';

import { store as storeFunction } from '../smart-selector/store.function';
import { ActionGroup } from '../types/action-group.interface';
import { actionFactory } from './action.factory';
import { Add } from './add.class';
import { LoadByIdsClassic } from './load-by-ids-classic.class';
import { LoadByIndexesClassic } from './load-by-indexes-classic.class';
import { removeIdFromParentsClassic } from './remove-id-from-parents-classic.function';
import { watchInitialRow } from './watch-initial-row.function';

/**
 * Action Service is what we call to dispatch actions and do whatever logic
 * is needed prior to the dispatch. This reduces the number of actions we
 * need to create, makes the code easier to read, centralizes the access
 * to the store, and keeps logic out of the reducer and effects without
 * scattering the logic throughout the application.
 */
export class ClassicNgrxFacade<
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
> extends FacadeBase<T> {
  entityAdapter!: EntityAdapter<T>;
  entities!: Observable<Dictionary<T>>;
  protected actions!: ActionGroup;
  private store = storeFunction();
  private loadByIndexesService!: LoadByIndexesClassic;
  private loadByIdsService!: LoadByIdsClassic;

  /**
   * Tries to initialize the ActionService.
   *
   * @returns true if successful, false if not
   */
  init(): boolean {
    if (this.initCalled) {
      return true;
    }
    this.initCalled = true;

    const entity = this.entity;
    if (!featureRegistry.hasFeature(this.feature)) {
      return false;
    }

    this.actions = actionFactory(this.feature, this.entity);
    const selectFeature = createFeatureSelector<
      Record<string, EntityState<SmartNgRXRowBase>>
    >(this.feature);

    this.entityDefinition = entityDefinitionRegistry(this.feature, this.entity);
    const selectEntity = createSelector(
      selectFeature,
      function selectEntityFunction(f): EntityState<T> {
        try {
          return f[entity] as EntityState<T>;
          // eslint-disable-next-line sonarjs/no-ignored-exceptions, unused-imports/no-unused-vars -- we ARE handling the error, buggy rule
        } catch (_) {
          return { ids: [], entities: {} };
        }
      },
    );
    this.selectId = (this.entityDefinition.selectId ??
      this.entityAdapter.selectId) as (row: T) => string;
    // This is needed in classic to get the selectors
    this.entityAdapter = this.entityDefinition.entityAdapter;

    this.initClasses();

    const selectEntities = this.entityAdapter.getSelectors().selectEntities;
    const selectFeatureEntities = createSelector(selectEntity, selectEntities);
    this.entities = this.store.select(selectFeatureEntities);

    const registry = entityRegistry.get(this.feature, this.entity);
    this.markDirtyFetchesNew =
      isNullOrUndefined(registry.markAndDeleteInit.markDirtyFetchesNew) ||
      registry.markAndDeleteInit.markDirtyFetchesNew;
    this.loadByIdsService.init(
      this.actions,
      this.entities,
      this.entityDefinition.defaultRow,
    );
    this.updateService.init();
    this.addService.init();
    this.loadByIndexesService.init(this.actions, this.entities);
    if (this.entityDefinition.isInitialRow === true) {
      watchInitialRow(this.feature, this.entity).pipe(take(1)).subscribe();
    }
    return true;
  }

  /**
   * marks the rows as dirty and takes into account settings
   * indicating if this should cause a refresh or not
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
   * this forces the row to be marked as dirty regardless
   * of any other conditions. Primarily used for websockets
   *
   * @param ids the ids to mark as dirty
   */
  forceDirty(ids: string[]): void {
    const markDirtyWithEntities = this.markDirtyWithEntities.bind(this);
    this.entities
      .pipe(take(1))
      .subscribe(function markDirtySubscribe(entities) {
        markDirtyWithEntities(entities as Record<string, T>, ids);
      });
  }

  /**
   * marks the rows represented by the ids as not dirty
   *
   * @param id the id of the row to mark as not dirty
   */
  markNotDirty(id: string): void {
    this.store.dispatch(
      this.actions.updateMany({
        changes: [
          {
            id,
            changes: { isDirty: false },
          },
        ],
      }),
    );
  }

  /**
   * Rows that can be removed are unregisterd from the garbage collection
   * and then removed from the store if they are not being edited.
   *
   * @param ids the ids to remove
   */
  garbageCollect(ids: string[]): void {
    const garbageCollectWithEntities =
      this.garbageCollectWithEntities.bind(this);
    this.entities
      .pipe(take(1))
      .subscribe(function garbageCollectSubscribe(entities) {
        garbageCollectWithEntities(entities as Record<string, T>, ids);
      });
  }

  /**
   * removes the rows represented by ids from the store unconditionally
   *
   * @param ids the ids of the rows to remove from the store
   */
  override remove(ids: string[]): void {
    this.store.dispatch(
      this.actions.remove({
        ids,
      }),
    );
  }

  /**
   * updates the row in the store
   *
   * @param oldRow the row before the changes
   * @param newRow the row after the changes
   */
  update(oldRow: SmartNgRXRowBase, newRow: SmartNgRXRowBase): void {
    this.optimisticUpdate(oldRow, newRow);
    this.updateService.update(oldRow, newRow);
  }

  /**
   * updates many rows in the store
   *
   * @param changes the changes to make
   */
  updateMany(changes: UpdateStr<SmartNgRXRowBase>[]): void {
    this.store.dispatch(
      this.actions.updateMany({
        changes,
      }),
    );
  }

  /**
   * Calls the loadByIds action to load the rows into the store.
   *
   * @param ids the ids to load
   */
  override loadByIds(ids: string): void {
    this.loadByIdsService.loadByIds(ids);
  }

  /**
   * adds dummy rows to the store for ones we are retrieving
   *
   * @param ids the ids we are retrieving
   */
  override loadByIdsPreload(ids: string[]): void {
    this.loadByIdsService.loadByIdsPreload(ids);
  }

  /**
   * puts the rows in the store
   *
   * @param rows the rows to put in the store
   */
  loadByIdsSuccess(rows: SmartNgRXRowBase[]): void {
    this.loadByIdsService.loadByIdsSuccess(rows);
  }

  /**
   * que up loading the ids for the indexes
   *
   * @param parentId the id of the parent row
   * @param childField the child field to load
   * @param index the index to load
   */
  loadByIndexes(parentId: string, childField: string, index: number): void {
    this.loadByIndexesService.loadByIndexes(parentId, childField, index);
  }

  /**
   * This updates the childField with the ids provided so we can
   * use them in the VirtualArray. Make sure when you call this
   * you are calling the service for the parent entity and not the
   * child entity.
   *
   * @param parentId the id of the parent row so we can update the proper childField
   * @param childField the child field to update
   * @param array specifiers that define the new partial array
   */
  loadByIndexesSuccess(
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
    this.store.dispatch(this.actions.upsertRow({ row }));
  }

  /**
   * removes the id from the child arrays of the parent rows
   *
   * @param id the id to remove
   * @returns the parent info for each parent
   */
  override removeFromParents(id: string): ParentInfo[] {
    return super.removeFromParentsWithFunction(id, removeIdFromParentsClassic);
  }

  /**
   * Initializes the classes the ActionService needs to function
   */
  private initClasses(): void {
    this.loadByIndexesService = new LoadByIndexesClassic(
      this.feature,
      this.entity,
      this.store,
    );
    this.loadByIdsService = new LoadByIdsClassic(
      this.feature,
      this.entity,
      this.store,
    );
    this.updateService = new Update<T>(
      this.feature,
      this.entity,
      this.selectId as (row: T) => string,
      this.loadByIdsSuccess.bind(this),
    );
    this.addService = new Add<T>(this);
  }
}
