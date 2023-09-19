import { createSelector } from '@ngrx/store';

import { selectSharedState } from '../shared.selectors';

export const selectCurrentWorkspaceId = createSelector(
  selectSharedState,
  (state) => {
    return state.currentWorkspace ?? state.workspaces.ids[0] ?? '';
  }
);
