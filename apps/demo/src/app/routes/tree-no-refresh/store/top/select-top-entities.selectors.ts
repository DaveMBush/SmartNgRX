// jscpd:ignore-start
// intentionally duplicated.
import { createSelector } from '@ngrx/store';

import { selectTreeNoRefreshState } from '../selectors/select-tree-no-refresh-state.selectors';

export const selectTopEntities = createSelector(
  selectTreeNoRefreshState,
  function selectTopEntitiesFunction(state) {
    return state.top;
  },
);
// jscpd:ignore-end
