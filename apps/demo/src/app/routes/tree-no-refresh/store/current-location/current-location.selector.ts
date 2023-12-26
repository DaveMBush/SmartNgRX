import { createSelector } from '@ngrx/store';

import {
  selectTreeNoRefreshState,
  selectTreeNoRefreshState2,
} from '../tree-no-refresh.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeNoRefreshState,
  selectTreeNoRefreshState2,
  (state, state2) => {
    if (state2.currentLocation.length > 0) {
      return state2.currentLocation;
    }
    return state.locations.ids[0] ?? '';
  },
);
