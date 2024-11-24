import { EntityState } from '@ngrx/entity';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { actionFactory } from '../actions/action.factory';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

/**
 * This creates a reducer for the give source. It is used internally
 * and documented here for future contributions. Application code
 * should never need to use this function.
 *
 * @param feature The feature name for this reducer
 * @param entity The entity name (source) for this reducer
 * @returns a new reducer for the source provided
 */
export function reducerFactory<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
): ActionReducer<EntityState<T>> {
  const adapter = entityDefinitionCache<T>(feature, entity).entityAdapter;
  const initialState = adapter.getInitialState();
  const actions = actionFactory<T>(feature, entity);

  return createReducer(
    initialState,
    on(actions.add, function actionsAddReducer(state, { row }) {
      return adapter.upsertOne(row, state);
    }),
    on(
      actions.addSuccess,
      function actionsAddSuccessReducer(state, { newRow }) {
        return adapter.upsertOne(newRow, state);
      },
    ),
    on(
      actions.updateMany,
      function actionsUpdateManyReducer(state, { changes }) {
        return adapter.updateMany(changes, state);
      },
    ),
    on(actions.remove, function actionsRemoveReducer(state, { ids }) {
      return adapter.removeMany(ids, state);
    }),
    on(actions.update, function actionsUpdateReducer(state, { new: { row } }) {
      return adapter.upsertOne(row, state);
    }),

    on(actions.storeRows, function actionsStoreRowsReducer(state, { rows }) {
      return adapter.upsertMany(rows, state);
    }),
  );
}
