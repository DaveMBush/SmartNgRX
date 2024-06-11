import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { take } from 'rxjs';

import { ActionService } from '../actions/action.service';
import { forNext } from '../common/for-next.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { store } from '../selector/store.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

/**
 * Use this function to update the rows represented by the ids for an entity in a feature in response
 * to a websocket event indicating the row has been updated.
 *
 * @param feature The feature the entity is in.
 * @param entity The entity to update.
 * @param ids The ids of the rows that need to be refreshed.
 */
export function updateEntity<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
  ids: string[],
): void {
  const actionService = new ActionService<T>(
    feature as StringLiteralSource<string>,
    entity as StringLiteralSource<string>,
  );
  const selectFeature =
    createFeatureSelector<Record<string, EntityState<T>>>(feature);
  const selectEntities = createSelector(
    selectFeature,
    (state: Record<string, EntityState<T>>) => {
      return state[entity]?.entities ?? {};
    },
  );
  store()
    .select(selectEntities)
    .pipe(take(1))
    .subscribe((state) => {
      forNext(ids, (id) => {
        if (state[id] !== undefined) {
          actionService.loadByIds([id]);
        }
      });
    });
}
