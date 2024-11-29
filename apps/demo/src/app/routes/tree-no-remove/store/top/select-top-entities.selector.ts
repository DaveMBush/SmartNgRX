import { createSelector } from '@ngrx/store';

import { selectTreeNoRemoveState } from '../selectors/select-tree-no-remove-state.selectors';

export const selectTopEntities = createSelector(
  selectTreeNoRemoveState,
  function selectTopEntitiesFunction(state) {
    return state.top;
  },
);
