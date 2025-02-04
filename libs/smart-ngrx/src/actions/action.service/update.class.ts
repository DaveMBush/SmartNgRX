import { EntityAdapter } from '@ngrx/entity';
import {
  concatMap,
  debounceTime,
  groupBy,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { handleError } from '../../error-handler/handle-error.function';
import { entityDefinitionRegistry } from '../../registrations/entity-definition-registry.function';
import { serviceRegistry } from '../../registrations/service-registry.class';
import { RowProp } from '../../types/row-prop.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { manageMaps } from './manage-maps.function';

/** The debounce time in milliseconds for update operations */
const updateDebounceTimeMs = 1;

/** The index of the first row in an array of rows */
const firstRowIndex = 0;

interface UpdateAction {
  old: RowProp<SmartNgRXRowBase>;
  new: RowProp<SmartNgRXRowBase>;
}

function groupByIdFn(action: UpdateAction): string {
  return action.old.row.id;
}

/**
 * Class responsible for updating rows in the store
 */
export class Update<T extends SmartNgRXRowBase> {
  private readonly updateSubject = new Subject<UpdateAction>();
  protected readonly lastRow: Map<string, SmartNgRXRowBase> = new Map();
  protected readonly lastRowTimeout: Map<string, number> = new Map();

  /**
   * constructor
   *
   * @param feature the feature name
   * @param entity the entity name
   * @param entityAdapter the entity adapter
   * @param loadByIdsSuccess the loadByIdsSuccess action function
   */
  constructor(
    readonly feature: string,
    readonly entity: string,
    readonly entityAdapter: EntityAdapter<T>,
    readonly loadByIdsSuccess: (rows: T[]) => void,
  ) {}

  /**
   * Initializes the update pipeline
   */
  init(): void {
    this.createUpdatePipeline().subscribe();
  }

  /**
   * updates the row in the store
   *
   * @param oldRow the row before the changes
   * @param newRow the row after the changes
   */
  update(oldRow: SmartNgRXRowBase, newRow: SmartNgRXRowBase): void {
    this.updateSubject.next({
      old: { row: oldRow },
      new: { row: newRow },
    });
  }

  /**
   * Handles update errors by rolling back to the original row
   *
   * @param error The error that occurred
   * @param originalRow The original row to roll back to
   *
   * @returns An observable of the original row
   */
  protected handleUpdateError(
    error: unknown,
    originalRow: SmartNgRXRowBase,
  ): Observable<T[]> {
    handleError('Error updating row, rolling back to original row', error);
    return of([originalRow as T]);
  }

  /**
   * Creates the update pipeline for processing row updates
   *
   * @returns An Observable that processes and handles row updates
   */
  private createUpdatePipeline(): Observable<void> {
    function mapToVoidFn(): void {
      return;
    }

    const updateRow = this.createUpdateRow();
    const updateEffectMap = this.createUpdateEffectMap();

    function processGroupFn(
      this: Update<T>,
      group: Observable<UpdateAction>,
    ): Observable<T[]> {
      return group.pipe(
        debounceTime(updateDebounceTimeMs),
        map(function mapToUpdateActionFn(action: UpdateAction): UpdateAction {
          return action;
        }),
        concatMap(updateRow),
        tap(updateEffectMap),
      );
    }

    const boundProcessGroup = processGroupFn.bind(this);

    return this.updateSubject.pipe(
      tap(this.createUpdateEffectTap()),
      groupBy(groupByIdFn),
      mergeMap(boundProcessGroup),
      map(mapToVoidFn),
    );
  }

  /**
   * Creates the update effect tap function
   *
   * @returns A function that handles the update effect tap
   */
  private createUpdateEffectTap(): (action: UpdateAction) => void {
    return function updateEffectTapFn(
      this: Update<T>,
      action: UpdateAction,
    ): void {
      manageMaps(this.lastRow, this.lastRowTimeout, action);
    }.bind(this);
  }

  /**
   * Creates the update row function
   *
   * @returns A function that updates a row
   */
  private createUpdateRow(): (action: UpdateAction) => Observable<T[]> {
    function handleErrorFn(
      this: Update<T>,
      error: unknown,
      action: UpdateAction,
    ): Observable<T[]> {
      return this.handleUpdateError(error, action.old.row);
    }

    return function updateRowFn(
      this: Update<T>,
      action: UpdateAction,
    ): Observable<T[]> {
      const effectService = serviceRegistry.get(
        entityDefinitionRegistry(this.feature, this.entity).effectServiceToken,
      );

      const boundHandleError = handleErrorFn.bind(this);

      function catchErrorFn(error: unknown): Observable<T[]> {
        return boundHandleError(error, action);
      }

      return effectService
        .update(action.new.row as T)
        .pipe(catchError(catchErrorFn)) as unknown as Observable<T[]>;
    }.bind(this);
  }

  /**
   * Creates the update effect map function
   *
   * @returns A function that handles the update effect map
   */
  private createUpdateEffectMap(): (rows: T[]) => void {
    return function updateEffectMapFn(this: Update<T>, rows: T[]): void {
      const now = Date.now();
      const id = this.entityAdapter.selectId(rows[firstRowIndex]) as string;
      this.lastRowTimeout.delete(id);
      this.lastRowTimeout.set(id, now);
      this.lastRow.set(id, rows[firstRowIndex]);
      this.loadByIdsSuccess(rows);
    }.bind(this);
  }
}
