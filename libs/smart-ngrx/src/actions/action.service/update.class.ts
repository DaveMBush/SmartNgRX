import { EntityAdapter } from '@ngrx/entity';
import {
  concatMap,
  debounceTime,
  map,
  mergeMap,
  of,
  scan,
  Subject,
  tap,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { manageMaps } from '../../effects/effects-factory/update-effect/manage-maps.function';
import { effectServiceRegistry } from '../../registrations/effect-service-registry.class';
import { entityDefinitionCache } from '../../registrations/entity-definition-cache.function';
import { RowProp } from '../../types/row-prop.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';

/**
 * Class responsible for updating rows in the store
 */
export class Update<T extends SmartNgRXRowBase> {
  private updateSubject = new Subject<{
    old: RowProp<SmartNgRXRowBase>;
    new: RowProp<SmartNgRXRowBase>;
  }>();

  /**
   * constructor
   *
   * @param feature the feature name
   * @param entity the entity name
   * @param entityAdapter the entity adapter
   * @param loadByIdsSuccess the loadByIdsSuccess action function
   */
  constructor(
    private readonly feature: string,
    private readonly entity: string,
    private readonly entityAdapter: EntityAdapter<T>,
    private readonly loadByIdsSuccess: (rows: T[]) => void,
  ) {}

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
   * Initializes the updateSubject and the lastRow and lastRowTimeout maps
   */
  init() {
    const lastRow: Map<string, SmartNgRXRowBase> = new Map();
    const lastRowTimeout: Map<string, number> = new Map();
    const context = this;

    this.updateSubject
      .pipe(
        tap(function updateEffectTap(action) {
          manageMaps(lastRow, lastRowTimeout, action);
        }),
        // scan allows us to change fields in multiple rows
        // within the same event loop
        scan(
          function updateScan(acc, action) {
            return {
              ...acc,
              [action.old.row.id]: action,
            };
          },
          {} as Record<
            string,
            { old: RowProp<SmartNgRXRowBase>; new: RowProp<SmartNgRXRowBase> }
          >,
        ),
        // debounceTime(1) lets us set multiple fields in a row but only
        // call the server once
        debounceTime(1),
        // mergeMap allows us to call the server once for each
        // row that was updated
        mergeMap(function updateEffectMergeMap(accActions) {
          return Object.values(accActions);
        }),
        concatMap(function updateEffectConcatMap(action) {
          const effectService = effectServiceRegistry.get(
            entityDefinitionCache(context.feature, context.entity)
              .effectServiceToken,
          );
          return effectService.update(action.new.row).pipe(
            catchError(function updateEffectConcatMapCatchError() {
              return of([action.old.row]);
            }),
          );
        }),
        map(function updateEffectMap(rows) {
          // set the last row to the row we got back here.
          // rows only has one row it it we just return an array
          // so we can reuse code.
          const now = Date.now();
          const id = context.entityAdapter.selectId(rows[0] as T) as string;
          // delete the timeout to keep things in order.
          lastRowTimeout.delete(id);
          lastRowTimeout.set(id, now);
          lastRow.set(id, rows[0] as T);
          context.loadByIdsSuccess(rows as T[]);
        }),
      )
      .subscribe();
  }
}
