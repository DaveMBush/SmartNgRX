import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { rootInjector } from '../common/root-injector.function';
import { smartNgRXErrorHandlerToken } from '../error-handler/smart-ngrx-error-handler-token.const';
import { ensureDataLoaded } from '../selector/ensure-data-loaded.function';
import { store } from '../selector/store.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

/**
 * This watches the row specified as a top level row so that it can
 * refresh it when it is marked dirty.
 *
 * @param feature the name of the feature this is related to
 * @param entity the name of the entity this is related to
 * @returns the effects for this feature/effect
 */
export function watchInitialRow<T extends SmartNgRXRowBase>(
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
      catchError(function watchInitialRowEffectCatchError(error: unknown) {
        const errorHandler = rootInjector.get().get(smartNgRXErrorHandlerToken);
        errorHandler.handleError('watchInitialRow', error);
        return EMPTY;
      }),
      tap(function watchInitialRowEffectTap(topRowEntity) {
        ensureDataLoaded(topRowEntity, '1', feature, entity);
      }),
    );
}
