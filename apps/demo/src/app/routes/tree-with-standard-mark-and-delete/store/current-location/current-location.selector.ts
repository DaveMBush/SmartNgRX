import { createSelector } from '@ngrx/store';

import { selectSharedState, selectSharedState2 } from '../../shared.selectors';

export const selectCurrentLocationId = createSelector(
  selectSharedState,
  selectSharedState2,
  (state, state2) => {
    if (state2.currentLocation.length > 0) {
      return state2.currentLocation;
    }
    return state.locations.ids[0] ?? '';
  },
);
