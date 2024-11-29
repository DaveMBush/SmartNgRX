// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { selectTreeNoRemoveState } from '../../selectors/select-tree-no-remove-state.selectors';

export const selectLocationEntities = createSelector(
  selectTreeNoRemoveState,
  function selectLocationEntitiesFunction(state) {
    return state.locations;
  },
);

// jscpd:ignore-end
