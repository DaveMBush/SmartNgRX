import { createSelector } from '@ngrx/store';

import { selectTreeNoDirtyState } from '../selectors/select-tree-no-dirty-state.selectors';

export const selectDepartments = createSelector(
  selectTreeNoDirtyState,
  function selectDepartmentsFunction(state) {
    return state.departments;
  },
);
