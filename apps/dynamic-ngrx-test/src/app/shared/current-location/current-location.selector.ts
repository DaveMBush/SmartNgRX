import { createSelector } from '@ngrx/store';

import { selectSharedState } from '../shared.selectors';

export const selectCurrentLocationId = createSelector(
  selectSharedState,
  (state) => {
    if (state.currentLocation.length > 0) {
      return state.currentLocation;
    }
    return state.locations.ids[0] ?? '';
  }
);
