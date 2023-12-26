import { createSelector } from '@ngrx/store';

import { selectTreeNoRefreshState } from '../tree-no-refresh.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeNoRefreshState,
  (state) => {
    return state.departmentChildren;
  },
);
