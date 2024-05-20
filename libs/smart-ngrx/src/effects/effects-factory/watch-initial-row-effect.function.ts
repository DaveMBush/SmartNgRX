import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tap } from 'rxjs';

import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
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
  feature: StringLiteralSource<string>,
  entity: StringLiteralSource<string>,
) {
  const selectFeature =
    createFeatureSelector<Record<string, EntityState<T>>>(feature);
  const selectTopRow = createSelector(selectFeature, (state) => {
    return state[entity];
  });
  return () => {
    return store()
      .select(selectTopRow)
      .pipe(
        tap((topRowEntity) => {
          ensureDataLoaded(topRowEntity, '1', feature, entity);
        }),
      );
  };
}
