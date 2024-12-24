import { createSelector } from '@ngrx/store';

import { selectTreeNoRefreshState2 } from '../selectors/select-tree-no-refresh-state2.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeNoRefreshState2,
  function selectCurrentLocationIdFunction2(state2) {
    return state2.currentLocation;
  },
);
