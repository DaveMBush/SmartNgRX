import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { actionFactory } from '../functions/action.factory';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { defaultRows } from './default-rows.function';

/**
 * This creates a reducer for the give source. It is used internally
 * and documented here for future contributions. Application code
 * should never need to use this function.
 *
 * @param source The source of the actions for this effect
 * @param defaultRow A function that returns a default row for the given id
 * @returns a new reducer for the source provided
 */
export function reducerFactory<Source extends string, T>(
  source: StringLiteralSource<Source>,
  defaultRow: (id: string) => T,
): ActionReducer<EntityState<T>> {
  const adapter = createEntityAdapter<T>();
  const initialState = adapter.getInitialState();
  const actions = actionFactory<Source, T>(source);

  return createReducer(
    initialState,
    on(actions.add, (state, { row }) => adapter.addOne(row, state)),
    on(actions.load, (state, _) => {
      return adapter.setAll(defaultRows(['1'], state, defaultRow), state);
    }),
    on(actions.loadSuccess, (state, { rows }) => {
      return adapter.setAll(rows, state);
    }),

    // make sure that when we call loadByIds the store gets set with
    // something so that we don't try to refetch the same data
    // The other part of this is handled in an effect
    on(actions.loadByIdsPreload, (state, { ids }) =>
      adapter.upsertMany(defaultRows(ids, state, defaultRow), state),
    ),

    on(actions.loadByIdsSuccess, (state, { rows }) =>
      adapter.upsertMany(rows, state),
    ),
  );
}
