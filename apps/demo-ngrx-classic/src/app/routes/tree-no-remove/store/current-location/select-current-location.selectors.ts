import { createSelector } from '@ngrx/store';

import { selectTreeNoRemoveState2 } from '../selectors/select-tree-no-remove-state2.selectors';

export const selectCurrentLocationId = createSelector(
  selectTreeNoRemoveState2,
  function selectCurrentLocationIdFunction2(state2) {
    return state2.currentLocation;
  },
);
