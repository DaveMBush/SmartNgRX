import { createSelector } from '@ngrx/store';

import { selectTreeStandardSignalsState2 } from '../selectors/select-tree-standard-signals-state2.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeStandardSignalsState2,
  function selectCurrentLocationIdFunction2(state2) {
    // this gets set by the location.effect.service
    return state2.currentLocation;
  },
);
