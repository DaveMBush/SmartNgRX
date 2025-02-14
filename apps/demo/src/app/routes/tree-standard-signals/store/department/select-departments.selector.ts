import { createSelector } from '@ngrx/store';

import { selectTreeStandardSignalsState } from '../selectors/select-tree-standard-signals-state.selectors';

export const selectDepartments = createSelector(
  selectTreeStandardSignalsState,
  function selectDepartmentsFunction(state) {
    return state.departments;
  },
);
