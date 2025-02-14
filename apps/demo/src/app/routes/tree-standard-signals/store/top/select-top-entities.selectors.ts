import { createSelector } from '@ngrx/store';

import { selectTreeStandardSignalsState } from '../selectors/select-tree-standard-signals-state.selectors';

export const selectTopEntities = createSelector(
  selectTreeStandardSignalsState,
  function selectTopEntitiesFunction(state) {
    return state.top;
  },
);
