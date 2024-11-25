import { createSelector } from '@ngrx/store';

import { selectTreeNoRemoveState } from '../tree-no-remove.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoRemoveState,
  function selectDepartmentChildrenFunction(state) {
    return state.departmentChildren;
  },
);
