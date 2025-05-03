import { createSelector } from '@ngrx/store';

import { selectTreeStandardState2 } from '../selectors/select-tree-standard-state2.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeStandardState2,
  function selectCurrentLocationIdFunction2(state2) {
    // this gets set by the location.effect.service
    return state2.currentLocation;
  },
);
