import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';

import { getEntityRegistry } from '../..';
import { ActionService } from '../../actions/action.service';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
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
    // the store isn't available when we create the effect
    // so we have to create the ActionService here.
    const actionService = new ActionService(feature, entity);
    return store()
      .select(selectTopRow)
      .pipe(
        filter((topRowEntity) => {
          // if there is a row, the id will be '1' because all top rows are '1'
          return (
            topRowEntity.ids.length === 0 ||
            (topRowEntity.entities['1']!.isLoading !== true &&
              topRowEntity.entities['1']!.isDirty === true &&
              getEntityRegistry(feature, entity).markAndDeleteInit
                ?.markDirtyFetchesNew)
          );
        }),
        map((rows) => rows.entities['1']!),
        // id for top row will always be '1' so we use a literal here
        // instead of looking it up.
        tap(() => actionService.loadByIds(['1'])),
      );
  };
}
