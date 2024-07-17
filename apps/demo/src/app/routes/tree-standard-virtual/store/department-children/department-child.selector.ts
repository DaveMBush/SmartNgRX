import { createSelector } from '@ngrx/store';

import { selectTreeStandardVirtualState } from '../tree-standard-virtual-state.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeStandardVirtualState,
  (state) => {
    return state.departmentChildren;
  },
);
