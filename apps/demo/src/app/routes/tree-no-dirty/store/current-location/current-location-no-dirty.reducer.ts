import { createReducer, on } from '@ngrx/store';

import { currentLocationActions } from './current-location.actions';

const initialState = '';

export const currentLocationNoDirtyReducer = createReducer(
  initialState,
  on(
    currentLocationActions.set,
    function currentLocationNoDirtyReducerSetReducer(_, { id }) {
      return id;
    },
  ),
);
