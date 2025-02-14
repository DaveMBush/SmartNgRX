import { createReducer, on } from '@ngrx/store';

import { currentLocationActions } from './current-location.actions';

const initialState = '';

export const currentLocationStandardSignalsReducer = createReducer(
  initialState,
  on(
    currentLocationActions.set,
    function currentLocationStandardReducerSetFunction(_, { id }) {
      return id;
    },
  ),
);
