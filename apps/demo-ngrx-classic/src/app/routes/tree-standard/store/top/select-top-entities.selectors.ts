import { createSelector } from '@ngrx/store';

import { selectTreeStandardState } from '../selectors/select-tree-standard-state.selectors';

export const selectTopEntities = createSelector(
  selectTreeStandardState,
  function selectTopEntitiesFunction(state) {
    return state.top;
  },
);
