import { createSelector } from '@ngrx/store';

import { selectSharedState } from '../shared.selectors';

export const selectCurrentLocationId = createSelector(
  selectSharedState,
  (state) => {
    return state.currentLocation ?? state.locations.ids[0] ?? '';
  }
);
