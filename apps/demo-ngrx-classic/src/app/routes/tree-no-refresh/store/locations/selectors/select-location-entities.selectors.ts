// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { selectTreeNoRefreshState } from '../../selectors/select-tree-no-refresh-state.selectors';

export const selectLocationEntities = createSelector(
  selectTreeNoRefreshState,
  function selectLocationEntitiesFunction(state) {
    return state.locations;
  },
);
// jscpd:ignore-end
