import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import {
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  take,
  withLatestFrom,
} from 'rxjs';

import { mergeRowsWithEntities } from '../../common/merge-rows-with-entities.function';
import { EffectService } from '../../effects/effect-service';
import { entityRowsRegistry } from '../../mark-and-delete/entity-rows-registry.class';
import { defaultRows } from '../../reducers/default-rows.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { ActionService } from '../action.service';
import { ActionGroup } from '../action-group.interface';
import { bufferIdsAction } from './buffer-ids-action.function';
import { inject } from '@angular/core';
import { entityDefinitionCache } from '../../registrations/entity-definition-cache.function';

function notAPreloadId(c: string): boolean {
  return !['index-', 'indexNoOp-'].some(function someStartsWith(v) {
    return c.startsWith(v);
  });
}

/**
 * Manages the loading of rows by their Ids
 */
export class LoadByIds {
  private defaultRow!: (id: string) => SmartNgRXRowBase;
  private actions!: ActionGroup;
  private loadByIdsSubject = new Subject<string[]>();
  private entities!: Observable<Dictionary<SmartNgRXRowBase>>;
  private effectService!: EffectService<SmartNgRXRowBase>;
  /**
   * The constructor for the LoadByIds class.
   *
   * @param feature the name of the feature this class is for
   * @param entity the name of the entity this class is for
   * @param store the store to dispatch the actions to
   * @param effectService the effect service to use
   * @param actionService
   */
  constructor(
    private feature: string,
    private entity: string,
    private store: Store,
    private actionService: ActionService,
  ) {}

  /**
   * Initializes the service with the actions and starts the dispatcher.
   *
   * @param actions the actions to use
   * @param entities the entities to check for loading
   * @param defaultRow the default row to use
   */
  init(
    actions: ActionGroup,
    entities: Observable<Dictionary<SmartNgRXRowBase>>,
    defaultRow: (id: string) => SmartNgRXRowBase,
  ): void {
    this.actions = actions;
    this.entities = entities;
    this.defaultRow = defaultRow;
    this.loadByIdsDispatcher();
    this.effectService = inject(
      entityDefinitionCache(this.feature, this.entity).effectServiceToken,
    );
  }

  /**
   * Calls the loadByIds action to load the rows into the store.
   *
   * @param ids the ids to load
   */
  loadByIds(ids: string[]): void {
    this.loadByIdsSubject.next(ids);
  }

  /**
   * Dispatches the loadByIds action after buffering the ids.
   */
  loadByIdsDispatcher(): void {
    const effectService = this.effectService;
    const actionService = this.actionService;

    this.loadByIdsSubject
      .pipe(
        bufferIdsAction(),
        map(function loadByIdsDispatcherMap(ids) {
          return ids.filter(notAPreloadId);
        }),
        withLatestFrom(this.entities),
        mergeMap(function loadByIdsDispatcherSubscribe([ids, entity]) {
          ids = ids.filter(function loadByIdsDispatcherFilter(id) {
            return entity[id] === undefined || entity[id].isLoading !== true;
          });
          if (ids.length === 0) {
            return of([]);
          }
          actionService.loadByIdsPreload(ids);
          return effectService.loadByIds(ids);
        }),
        map(function loadByIdsEffectMapRow(rows) {
          actionService.loadByIdsSuccess(rows);
        }),
      )
      // this is a long running subscribe so we don't need to unsubscribe
      .subscribe();
  }

  /**
   * Calls the loadByIdsPreload action to load the rows into the store.
   *
   * @param ids the ids to load
   */
  loadByIdsPreload(ids: string[]): void {
    const store = this.store;
    const actions = this.actions;
    const defaultRow = this.defaultRow;
    const feature = this.feature;
    const thisEntity = this.entity;
    this.entities
      .pipe(take(1))
      .subscribe(function loadByIdsPreloadSubscribe(entity) {
        let rows = defaultRows(ids, entity, defaultRow);
        // don't let virtual arrays get overwritten by the default row
        rows = mergeRowsWithEntities(feature, thisEntity, rows, entity);
        store.dispatch(
          actions.storeRows({
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
  loadByIdsSuccess(rows: SmartNgRXRowBase[]): void {
    const feature = this.feature;
    const entity = this.entity;
    const store = this.store;
    const actions = this.actions;
    let registeredRows = entityRowsRegistry.register(feature, entity, rows);
    this.entities
      .pipe(take(1))
      .subscribe(function loadByIdsSuccessSubscribe(entities) {
        // don't let virtual arrays get overwritten by the default row
        registeredRows = mergeRowsWithEntities(
          feature,
          entity,
          registeredRows,
          entities,
        );
        store.dispatch(
          actions.storeRows({
            rows: registeredRows,
          }),
        );
      });
  }
}
