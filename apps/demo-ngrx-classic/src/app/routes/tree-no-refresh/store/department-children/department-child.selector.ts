import { createSelector } from '@ngrx/store';

import { selectTreeNoRefreshState } from '../selectors/select-tree-no-refresh-state.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoRefreshState,
  function selectDepartmentChildrenFunction(state) {
    return state.departmentChildren;
  },
);
