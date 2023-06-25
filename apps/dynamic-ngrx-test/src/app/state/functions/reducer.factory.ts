import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { actionFactory } from './action.factory';
import { StringLiteralSource } from './string-literal-source.type';

export const reducerFactory = <Source extends string, T>(
  source: StringLiteralSource<Source>
  ) => {
  const adapter = createEntityAdapter<T>();
  const initialState = adapter.getInitialState();
  const actions = actionFactory<Source, T>(source);

  return createReducer(
    initialState,
    on(actions.add, (state, {payload} ) => adapter.addOne(payload, state)),
    on(actions.loadSuccess, (state, {payload}) => adapter.setAll(payload, state))

  );

}
