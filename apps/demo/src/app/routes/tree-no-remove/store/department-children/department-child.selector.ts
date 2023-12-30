import { createSelector } from '@ngrx/store';

import { selectTreeNoRemoveState } from '../tree-no-remove.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoRemoveState,
  (state) => {
    return state.departmentChildren;
  },
);
