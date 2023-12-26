import { createSelector } from '@ngrx/store';

import { selectTreeStandardState } from '../tree-standard-state.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeStandardState,
  (state) => {
    return state.departmentChildren;
  },
);
