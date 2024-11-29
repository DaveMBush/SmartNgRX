import { createSelector } from '@ngrx/store';

import { selectTreeNoDirtyState } from '../selectors/select-tree-no-dirty-state.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoDirtyState,
  function selectDepartmentChildrenFunction(state) {
    return state.departmentChildren;
  },
);
