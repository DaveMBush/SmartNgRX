import { Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { UpdateStr } from '@ngrx/entity/src/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { asapScheduler, catchError, Observable, of, take } from 'rxjs';

import { forNext } from '../common/for-next.function';
import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { handleError } from '../error-handler/handle-error.function';
import { entityRowsRegistry } from '../mark-and-delete/entity-rows-registry.class';
import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { serviceRegistry } from '../registrations/service-registry.class';
import { store as storeFunction } from '../smart-selector/store.function';
import { virtualArrayMap } from '../smart-selector/virtual-array-map.const';
import { ActionGroup } from '../types/action-group.interface';
import { ParentInfo } from '../types/parent-info.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { actionFactory } from './classic-ngrx.facade/action.factory';
import { Add } from './classic-ngrx.facade/add.class';
import { LoadByIdsClassic } from './classic-ngrx.facade/load-by-ids-classic.class';
import { LoadByIndexesClassic } from './classic-ngrx.facade/load-by-indexes-classic.class';
import { markFeatureParentsDirty } from './classic-ngrx.facade/mark-feature-parents-dirty.function';
import { removeIdFromParentsClassic } from './classic-ngrx.facade/remove-id-from-parents-classic.function';
import { Update } from './classic-ngrx.facade/update.class';
import { watchInitialRow } from './classic-ngrx.facade/watch-initial-row.function';
import { FacadeBase } from './facade.base';

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
  markDirty(ids: string[]): void {
    const feature = this.feature;
    const entity = this.entity;
    if (!this.markDirtyFetchesNew) {
      this.entities
        .pipe(take(1))
        .subscribe(function markDirtySubscribe(entities) {
          const entIds = entities as Record<string, SmartNgRXRowBase>;
          const idsIds = [] as SmartNgRXRowBase[];
          forNext(ids, function markDirtyForNext(id) {
            idsIds.push(entIds[id]);
          });
          entityRowsRegistry.register(feature, entity, idsIds);
        });
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
        markDirtyWithEntities(entities, ids);
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
        garbageCollectWithEntities(entities, ids);
      });
  }

  /**
   * removes the rows represented by ids from the store unconditionally
   *
   * @param ids the ids of the rows to remove from the store
   */
  remove(ids: string[]): void {
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
   * adds a row to the store
   *
   * @param row the row to add
   * @param parentId the id of the parent row
   * @param parentService the service for the parent row
   */
  override add(row: T, parentId: string, parentService: FacadeBase): void {
    this.addService.add(row, parentId, parentService);
  }

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
  private removeFromParents(id: string): ParentInfo[] {
    const childDefinitions = childDefinitionRegistry.getChildDefinition(
      this.feature,
      this.entity,
    );
    const parentInfo: ParentInfo[] = [];
    forNext(
      childDefinitions,
      function removeFromParentsForNext(childDefinition) {
        removeIdFromParentsClassic(childDefinition, id, parentInfo);
      },
    );
    return parentInfo;
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

  private markDirtyWithEntities<R extends SmartNgRXRowBase>(
    entities: Dictionary<R>,
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
    this.store.dispatch(this.actions.updateMany({ changes: updates }));
  }

  private garbageCollectWithEntities<R extends SmartNgRXRowBase>(
    entities: Dictionary<R>,
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
    this.store.dispatch(
      this.actions.remove({
        ids: idsToRemove,
      }),
    );
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
    this.updateMany([{ id: id.toString(), changes }]);
  }
}
