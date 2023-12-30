import { createSelector } from '@ngrx/store';

import {
  selectTreeStandardState,
  selectTreeStandardState2,
} from '../tree-standard-state.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeStandardState,
  selectTreeStandardState2,
  (state, state2) => {
    if (state2.currentLocation.length > 0) {
      return state2.currentLocation;
    }
    return state.locations.ids[0] ?? '';
  },
);
