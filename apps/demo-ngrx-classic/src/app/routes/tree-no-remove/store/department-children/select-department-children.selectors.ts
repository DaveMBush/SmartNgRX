import { createSelector } from '@ngrx/store';

import { selectTreeNoRemoveState } from '../selectors/select-tree-no-remove-state.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoRemoveState,
  function selectDepartmentChildrenFunction(state) {
    return state.departmentChildren;
  },
);
