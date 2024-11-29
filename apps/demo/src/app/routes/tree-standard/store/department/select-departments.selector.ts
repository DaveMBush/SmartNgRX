import { createSelector } from '@ngrx/store';

import { selectTreeStandardState } from '../selectors/select-tree-standard-state.selectors';

export const selectDepartments = createSelector(
  selectTreeStandardState,
  function selectDepartmentsFunction(state) {
    return state.departments;
  },
);
