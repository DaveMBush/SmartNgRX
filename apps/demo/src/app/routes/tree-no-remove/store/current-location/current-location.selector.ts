import { createSelector } from '@ngrx/store';

import {
  selectTreeNoRemoveState,
  selectTreeNoRemoveState2,
} from '../tree-no-remove.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeNoRemoveState,
  selectTreeNoRemoveState2,
  (state, state2) => {
    if (state2.currentLocation.length > 0) {
      return state2.currentLocation;
    }
    return state.locations.ids[0] ?? '';
  },
);
