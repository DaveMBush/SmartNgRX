import { createSelector } from '@ngrx/store';

import { selectTreeStandardSignalsState } from '../selectors/select-tree-standard-signals-state.selectors';

export const selectDepartmentChildren = createSelector(
  selectTreeStandardSignalsState,
  function selectDepartmentChildrenFunction(state) {
    return state.departmentChildren;
  },
);
