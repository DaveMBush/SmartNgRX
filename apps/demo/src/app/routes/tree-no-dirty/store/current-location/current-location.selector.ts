import { createSelector } from '@ngrx/store';

import { selectTreeNoDirtyState2 } from '../tree-no-dirty.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeNoDirtyState2,
  function selectCurrentLocationIdFunction2(state2) {
    return state2.currentLocation;
  },
);
