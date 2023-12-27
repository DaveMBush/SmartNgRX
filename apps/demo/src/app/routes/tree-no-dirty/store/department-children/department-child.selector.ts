import { createSelector } from '@ngrx/store';

import { selectTreeNoDirtyState } from '../tree-no-dirty.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoDirtyState,
  (state) => {
    return state.departmentChildren;
  },
);
