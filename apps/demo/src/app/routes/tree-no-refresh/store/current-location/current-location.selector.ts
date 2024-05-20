import { createSelector } from '@ngrx/store';

import { selectTreeNoRefreshState2 } from '../tree-no-refresh.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeNoRefreshState2,
  (state2) => {
    return state2.currentLocation;
  },
);
