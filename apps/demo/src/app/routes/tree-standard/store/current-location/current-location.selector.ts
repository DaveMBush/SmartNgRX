import { createSelector } from '@ngrx/store';

import { selectTreeStandardState2 } from '../tree-standard-state.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeStandardState2,
  (state2) => {
    // this gets set by the location.effect.service
    return state2.currentLocation;
  },
);
