import { createSelector } from '@ngrx/store';

import { selectTreeNoRefreshState } from '../tree-no-refresh.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoRefreshState,
  function selectDepartmentChildrenFunction(state) {
    return state.departmentChildren;
  },
);
