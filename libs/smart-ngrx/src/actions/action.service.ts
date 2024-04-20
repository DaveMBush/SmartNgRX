import { Dictionary } from '@ngrx/entity';
import { EntityState, UpdateStr } from '@ngrx/entity/src/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import {
  registerEntityRows,
  unregisterEntityRows,
} from '../mark-and-delete/register-entity-rows.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { defaultRows } from '../reducers/default-rows.function';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { store as storeFunction } from '../selector/store.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { actionFactory } from './action.factory';
import { ActionGroup } from './action-group.interface';

/**
 * Action Service is what we call to dispatch actions and do whatever logic
 * is needed prior to the dispatch. This reduces the number of actions we
 * need to create, makes the code easier to read, centralizes the access
 * to the store, and keeps logic out of the reducer and effects without
 * scattering the logic throughout the application.
 */
export class ActionService<
  T extends SmartNgRXRowBase,
  Feature extends string = string,
  Entity extends string = string,
> {
  private actions: ActionGroup<T>;
  private entities: Observable<Dictionary<T>>;
  private store = storeFunction();

  /**
   * constructor for the ActionService
   *
   * @param feature the name of the feature this class is for
   * @param entity the name of the entity this class is for
   */
  constructor(
    private feature: StringLiteralSource<Feature>,
    private entity: StringLiteralSource<Entity>,
  ) {
    this.actions = actionFactory(feature, entity);
    const selectFeature = createFeatureSelector<EntityState<T>>(this.feature);
    const entityAdapter = entityDefinitionCache(
      this.feature,
      this.entity,
    ).entityAdapter;
    assert(
      !!entityAdapter,
      `Entity adapter for feature: ${this.feature} and entity: ${this.entity} not found.`,
    );
    const selectEntities = entityAdapter.getSelectors().selectEntities;
    const selectEntity = createSelector(selectFeature, selectEntities);
    this.entities = castTo<Observable<Dictionary<T>>>(
      this.store.select(selectEntity),
    );
  }

  /**
   * marks the rows as dirty
   *
   * @param ids the ids to mark as dirty
   */
  markDirty(ids: string[]): void {
    this.entities.pipe(take(1)).subscribe((entities) => {
      const changes = ids
        .filter((id) => {
          return entities[id] && entities[id]!.isEditing !== true;
        })
        .map((id) => ({ id, changes: { isDirty: true } }) as UpdateStr<T>);
      if (changes.length === 0) {
        return;
      }
      this.store.dispatch(this.actions.updateMany({ changes }));
    });
  }

  /**
   * marks the rows represented by the ids as not dirty
   *
   * @param ids the ids to mark as not dirty
   */
  markNotDirty(ids: string[]): void {
    this.store.dispatch(
      this.actions.updateMany({
        changes: ids.map(
          (id) => ({ id, changes: { isDirty: false } }) as UpdateStr<T>,
        ),
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
    this.entities.pipe(take(1)).subscribe((entities) => {
      let idsToRemove = ids.filter(
        (id) => entities[id] && entities[id]!.isEditing !== true,
      );
      if (idsToRemove.length === 0) {
        return;
      }
      idsToRemove = unregisterEntityRows(this.feature, this.entity, ids);
      this.store.dispatch(
        this.actions.remove({
          ids: idsToRemove,
        }),
      );
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
  update(oldRow: T, newRow: T): void {
    this.store.dispatch(
      this.actions.update({
        old: { row: oldRow },
        new: { row: newRow },
      }),
    );
  }

  /**
   * updates many rows in the store
   *
   * @param changes the changes to make
   */
  updateMany(changes: UpdateStr<T>[]): void {
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
  add(
    row: T,
    parentId: string,
    parentService: ActionService<SmartNgRXRowBase>,
  ): void {
    this.store.dispatch(
      this.actions.add({
        row,
        parentId,
        parentFeature: parentService.feature,
        parentEntityName: parentService.entity,
      }),
    );
  }

  /**
   * Calls the loadByIds action to load the rows into the store.
   *
   * @param ids the ids to load
   */
  loadByIds(ids: string[]): void {
    this.store.dispatch(
      this.actions.loadByIds({
        ids,
      }),
    );
  }

  /**
   * adds dummy rows to the store for ones we are retrieving
   *
   * @param ids the ids we are retrieving
   */
  loadByIdsPreload(ids: string[]): void {
    const defaultRow = entityDefinitionCache(
      this.feature,
      this.entity,
    ).defaultRow;
    this.entities.pipe(take(1)).subscribe((entities) => {
      const rows = defaultRows(ids, entities, defaultRow) as T[];
      this.store.dispatch(
        this.actions.storeRows({
          rows,
        }),
      );
    });
  }

  /**
   * loads a dummy row for the load so that the load won't fire again
   */
  load(): void {
    const defaultRow = entityDefinitionCache(
      this.feature,
      this.entity,
    ).defaultRow;
    this.entities.pipe(take(1)).subscribe((entities) => {
      const rows = defaultRows(['1'], entities, defaultRow) as T[];
      this.store.dispatch(
        this.actions.storeRows({
          rows,
        }),
      );
    });
  }

  /**
   * puts the rows in the store
   *
   * @param rows the rows to put in the store
   */
  loadByIdsSuccess(rows: T[]): void {
    const registeredRows = registerEntityRows(this.feature, this.entity, rows);
    this.store.dispatch(
      this.actions.storeRows({
        rows: registeredRows,
      }),
    );
  }
}
