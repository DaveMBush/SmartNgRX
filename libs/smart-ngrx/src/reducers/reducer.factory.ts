import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { UpdateStr } from '@ngrx/entity/src/models';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { actionFactory } from '../functions/action.factory';
import {
  registerEntityRows,
  unregisterEntityRows,
} from '../mark-and-delete/register-entity-rows.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { defaultRows } from './default-rows.function';

/**
 * This creates a reducer for the give source. It is used internally
 * and documented here for future contributions. Application code
 * should never need to use this function.
 *
 * @param feature The feature name for this reducer
 * @param entity The entity name (source) for this reducer
 * @param defaultRow A function that returns a default row for the given id
 * @returns a new reducer for the source provided
 */
export function reducerFactory<
  F extends string,
  E extends string,
  T extends MarkAndDelete,
>(
  feature: StringLiteralSource<F>,
  entity: StringLiteralSource<E>,
  defaultRow: (id: string) => T,
): ActionReducer<EntityState<T>> {
  const adapter = createEntityAdapter<T>();
  const initialState = adapter.getInitialState();
  const actions = actionFactory<F, E, T>(feature, entity);

  return createReducer(
    initialState,
    on(actions.add, (state, { row }) => adapter.addOne(row, state)),
    on(actions.load, (state, _) => {
      return adapter.setAll(defaultRows(['1'], state, defaultRow), state);
    }),
    on(actions.loadSuccess, (state, { rows }) => {
      return adapter.setAll(rows, state);
    }),
    on(actions.markDirty, (state, { ids }) => {
      const changes = ids.map(
        (id) => ({ id, changes: { isDirty: true } }) as UpdateStr<T>,
      );
      return adapter.updateMany(changes, state);
    }),
    on(actions.markNotDirty, (state, { ids }) => {
      const changes = ids.map(
        (id) => ({ id, changes: { isDirty: false } }) as UpdateStr<T>,
      );
      return adapter.updateMany(changes, state);
    }),
    on(actions.garbageCollect, (state, { ids }) => {
      return adapter.removeMany(
        unregisterEntityRows(feature, entity, ids),
        state,
      );
    }),
    on(actions.update, (state, { row }) => adapter.upsertOne(row, state)),

    // make sure that when we call loadByIds the store gets set with
    // something so that we don't try to refetch the same data
    // The other part of this is handled in an effect
    on(actions.loadByIdsPreload, (state, { ids }) =>
      adapter.upsertMany(defaultRows(ids, state, defaultRow), state),
    ),

    on(actions.loadByIdsSuccess, (state, { rows }) =>
      adapter.upsertMany(registerEntityRows(feature, entity, rows), state),
    ),
  );
}
