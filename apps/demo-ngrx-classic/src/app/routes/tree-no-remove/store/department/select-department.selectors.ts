import { createSelector } from '@ngrx/store';

import { selectTreeNoRemoveState } from '../selectors/select-tree-no-remove-state.selectors';

export const selectDepartments = createSelector(
  selectTreeNoRemoveState,
  function selectDepartmentsFunction(state) {
    return state.departments;
  },
);
