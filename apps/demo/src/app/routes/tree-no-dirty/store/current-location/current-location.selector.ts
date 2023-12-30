import { createSelector } from '@ngrx/store';

import {
  selectTreeNoDirtyState,
  selectTreeNoDirtyState2,
} from '../tree-no-dirty.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeNoDirtyState,
  selectTreeNoDirtyState2,
  (state, state2) => {
    if (state2.currentLocation.length > 0) {
      return state2.currentLocation;
    }
    return state.locations.ids[0] ?? '';
  },
);
