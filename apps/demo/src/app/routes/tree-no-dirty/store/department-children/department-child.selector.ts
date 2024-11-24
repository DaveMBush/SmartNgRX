import { createSelector } from '@ngrx/store';

import { selectTreeNoDirtyState } from '../tree-no-dirty.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoDirtyState,
  function selectDepartmentChildrenFunction(state) {
    return state.departmentChildren;
  },
);
