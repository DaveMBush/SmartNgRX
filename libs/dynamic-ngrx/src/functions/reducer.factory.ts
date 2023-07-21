import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { actionFactory } from './action.factory';

/**
 * This create a reducer for the give source
 * @param source - The source of the actions for this effect
 * @returns a new reducer for the source provided
 */
export function reducerFactory<Source extends string, T>(
  source: StringLiteralSource<Source>
): ActionReducer<EntityState<T>> {
  const adapter = createEntityAdapter<T>();
  const initialState = adapter.getInitialState();
  const actions = actionFactory<Source, T>(source);

  return createReducer(
    initialState,
    on(actions.add, (state, { row }) => adapter.addOne(row, state)),
    on(actions.loadSuccess, (state, { rows }) => adapter.setAll(rows, state))
  );
}
