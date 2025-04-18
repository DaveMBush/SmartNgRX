// jscpd:ignore-start
// intentionally duplicated.
import { createSelector } from '@ngrx/store';

import { selectTreeNoDirtyState } from '../selectors/select-tree-no-dirty-state.selectors';

export const selectTopEntities = createSelector(
  selectTreeNoDirtyState,
  function selectTopEntitiesFunction(state) {
    return state.top;
  },
);
// jscpd:ignore-end
