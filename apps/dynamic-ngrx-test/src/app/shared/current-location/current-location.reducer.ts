import { createReducer, on } from '@ngrx/store';

import { currentLocationActions } from './current-location.actions';

const initialState = '1';

export const currentLocationReducer = createReducer(
  initialState,
  on(currentLocationActions.set, (_, { id }): string => id),
);
