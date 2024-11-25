import { createReducer, on } from '@ngrx/store';

import { currentLocationActions } from './current-location.actions';

const initialState = '';

export const currentLocationNoRemoveReducer = createReducer(
  initialState,
  on(
    currentLocationActions.set,
    function currentLocationNoRemoveReducerSetFunction(_, { id }) {
      return id;
    },
  ),
);
