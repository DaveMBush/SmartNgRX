import {
  bufferIds,
  defaultRows,
  entityDefinitionRegistry,
  entityRowsRegistry,
  mergeRowsWithEntities,
  rootInjector,
  serviceRegistry,
  smartErrorHandlerToken,
  SmartNgRXRowBase,
} from '@smarttools/core';
import { catchError, map, mergeMap, Observable, of, Subject } from 'rxjs';

import { SignalsFacade } from './signals-facade';

function notAPreloadId(c: string): boolean {
  return !['index-', 'indexNoOp-'].some(function someStartsWith(v) {
    return c.startsWith(v);
  });
}

/**
 * Manages the loading of rows by their Ids
 */
export class LoadByIdsSignals<T extends SmartNgRXRowBase> {
  private defaultRow!: (id: string) => T;
  private loadByIdsSubject = new Subject<string>();
  private feature: string;
  private entity: string;
  /**
   * The constructor for the LoadByIds class.
   *
   * @param facade the signal facade that called this class
   */
  constructor(private facade: SignalsFacade<T>) {
    this.feature = facade.feature;
    this.entity = facade.entity;
  }

  /**
   * Initializes the service with the actions and starts the dispatcher.
   *
   * @param defaultRow the default row to use
   */
  init(defaultRow: (id: string) => T): void {
    this.defaultRow = defaultRow;
    this.loadByIdsDispatcher();
  }

  /**
   * buffers the Id in the loadByIdsSubject.
   *
   * @param ids the ids to load
   */
  loadByIds(ids: string): void {
    this.loadByIdsSubject.next(ids);
  }

  // jscpd:ignore-start
  // this is similar to the classic NgRX version
  // but it is unique enough that we can't
  // combine without tightly coupling the two
  // which will end up in separate libraries.
  /**
   * Dispatches the loadByIds action after buffering the ids.
   */
  loadByIdsDispatcher(): void {
    const feature = this.facade.feature;
    const entityName = this.facade.entity;
    const actionService = this.facade;

    this.loadByIdsSubject
      .pipe(
        bufferIds(),
        mergeMap(function loadByIdsDispatcherMap(ids) {
          ids = ids.filter(notAPreloadId);
          const entities = actionService.entityState.entityMap();
          ids = ids.filter(function loadByIdsDispatcherFilter(id) {
            return (
              entities[id] === undefined || entities[id].isLoading !== true
            );
          });
          if (ids.length === 0) {
            return of([]);
          }
          const effectService = serviceRegistry.get(
            entityDefinitionRegistry(feature, entityName).effectServiceToken,
          );
          actionService.loadByIdsPreload(ids);
          return effectService.loadByIds(ids) as Observable<T[]>;
        }),
        map(function loadByIdsSuccessMap(rows) {
          actionService.loadByIdsSuccess(rows);
          return of(rows);
        }),
        catchError(function loadByIdsError(error: unknown) {
          const errorHandler = rootInjector.get().get(smartErrorHandlerToken);
          errorHandler.handleError('loadByIds', error);
          return of([]);
        }),
      )
      .subscribe();
  }

  // jscpd:ignore-end
  /**
   * Calls the loadByIdsPreload action to load the rows into the store.
   *
   * @param ids the ids to load
   */
  loadByIdsPreload(ids: string[]): void {
    const defaultRow = this.defaultRow;
    const feature = this.facade.feature;
    const entity = this.facade.entity;
    const entities = this.facade.entityState.entityMap();
    let rows = defaultRows(ids, entities, defaultRow);
    // don't let virtual arrays get overwritten by the default row
    rows = mergeRowsWithEntities(feature, entity, rows, entities);
    this.facade.storeRows(rows);
  }

  /**
   * puts the rows in the store
   *
   * @param rows the rows to put in the store
   */
  loadByIdsSuccess(rows: T[]): void {
    let registeredRows = entityRowsRegistry.register(
      this.feature,
      this.entity,
      rows,
    );
    const entities = this.facade.entityState.entityMap();
    // don't let virtual arrays get overwritten by the default row
    registeredRows = mergeRowsWithEntities(
      this.feature,
      this.entity,
      registeredRows,
      entities,
    );
    this.facade.storeRows(registeredRows);
  }
}
