import { createReducer, on } from '@ngrx/store';

import { currentLocationActions } from './current-location.actions';

const initialState = '';

export const currentLocationNoRefreshReducer = createReducer(
  initialState,
  on(
    currentLocationActions.set,
    function currentLocationNoRefreshReducerSetFunction(_, { id }) {
      return id;
    },
  ),
);
