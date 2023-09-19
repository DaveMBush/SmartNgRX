import { createReducer, on } from '@ngrx/store';

import { currentWorkspaceActions } from './current-workspace.actions';

const initialState = '1';

export const currentWorkspaceReducer = createReducer(
  initialState,
  on(currentWorkspaceActions.set, (_, { id }): string => id)
);
