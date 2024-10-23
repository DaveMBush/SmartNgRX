import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, take, withLatestFrom } from 'rxjs';

import { mergeRowsWithEntities } from '../../common/merge-rows-with-entities.function';
import { registerEntityRows } from '../../mark-and-delete/register-entity-rows.function';
import { defaultRows } from '../../reducers/default-rows.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { ActionGroup } from '../action-group.interface';
import { bufferIdsAction } from './buffer-ids-action.function';

function notAPreloadId(c: string): boolean {
  return !['index-', 'indexNoOp-'].some((v) => c.startsWith(v));
}

/**
 * Manages the loading of rows by their Ids
 */
export class LoadByIds {
  private defaultRow!: (id: string) => SmartNgRXRowBase;
  private actions!: ActionGroup;
  private loadByIdsSubject = new Subject<string[]>();
  private entities!: Observable<Dictionary<SmartNgRXRowBase>>;
  /**
   * The constructor for the LoadByIds class.
   *
   * @param feature the name of the feature this class is for
   * @param entity the name of the entity this class is for
   * @param store the store to dispatch the actions to
   */
  constructor(
    private feature: string,
    private entity: string,
    private store: Store,
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
    this.loadByIdsSubject
      .pipe(
        bufferIdsAction(),
        map((ids) => ids.filter(notAPreloadId)),
        withLatestFrom(this.entities),
      )
      .subscribe(([ids, entity]) => {
        ids = ids.filter(
          (id) => entity[id] === undefined || entity[id]!.isLoading !== true,
        );
        if (ids.length === 0) {
          return;
        }
        this.store.dispatch(
          this.actions.loadByIds({
            ids,
          }),
        );
      });
  }

  /**
   * Calls the loadByIdsPreload action to load the rows into the store.
   *
   * @param ids the ids to load
   */
  loadByIdsPreload(ids: string[]): void {
    this.entities.pipe(take(1)).subscribe((entity) => {
      let rows = defaultRows(ids, entity, this.defaultRow);
      // don't let virtual arrays get overwritten by the default row
      rows = mergeRowsWithEntities(this.feature, this.entity, rows, entity);
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
  loadByIdsSuccess(rows: SmartNgRXRowBase[]): void {
    let registeredRows = registerEntityRows(this.feature, this.entity, rows);
    this.entities.pipe(take(1)).subscribe((entities) => {
      // don't let virtual arrays get overwritten by the default row
      registeredRows = mergeRowsWithEntities(
        this.feature,
        this.entity,
        registeredRows,
        entities,
      );
      this.store.dispatch(
        this.actions.storeRows({
          rows: registeredRows,
        }),
      );
    });
  }
}
