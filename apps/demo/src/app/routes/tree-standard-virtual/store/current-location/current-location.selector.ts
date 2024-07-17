import { createSelector } from '@ngrx/store';

import { selectTreeStandardVirtualState2 } from '../tree-standard-virtual-state.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeStandardVirtualState2,
  (state2) => {
    // this gets set by the location.effect.service
    return state2.currentLocation;
  },
);
