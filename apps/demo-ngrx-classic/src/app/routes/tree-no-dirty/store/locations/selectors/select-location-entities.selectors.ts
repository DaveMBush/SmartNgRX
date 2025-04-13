// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { selectTreeNoDirtyState } from '../../selectors/select-tree-no-dirty-state.selectors';

export const selectLocationEntities = createSelector(
  selectTreeNoDirtyState,
  function selectLocationEntitiesFunction(state) {
    return state.locations;
  },
);
// jscpd:ignore-end
