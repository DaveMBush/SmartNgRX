import { createSelector } from '@ngrx/store';

import { selectTreeNoRefreshState } from '../selectors/select-tree-no-refresh-state.selectors';

export const selectDepartments = createSelector(
  selectTreeNoRefreshState,
  function selectDepartmentsFunction(state) {
    return state.departments;
  },
);
