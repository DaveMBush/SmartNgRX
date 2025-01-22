import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { ensureDataLoaded } from '../../selector/ensure-data-loaded.function';
import { store } from '../../selector/store.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
/**
 * This watches the row specified as a top level row so that it can
 * refresh it when it is marked dirty.
 *
 * @param feature the name of the feature this is related to
 * @param entity the name of the entity this is related to
 * @returns the effects for this feature/effect
 */
export function watchInitialRowEffect<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
): Observable<EntityState<T>> {
  const selectFeature =
    createFeatureSelector<Record<string, EntityState<T>>>(feature);
  const selectTopRow = createSelector(
    selectFeature,
    function watchInitialRowEffectSelectTopRow(state) {
      return state[entity];
    },
  );

  return store()
    .select(selectTopRow)
    .pipe(
      tap(function watchInitialRowEffectTap(topRowEntity) {
        ensureDataLoaded(topRowEntity, '1', feature, entity);
      }),
    );
}
