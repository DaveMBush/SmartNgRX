import { createSelector } from '@ngrx/store';

import { selectSharedState } from '../../shared.selectors';

export const selectDepartmentChildren = createSelector(
  selectSharedState,
  (state) => {
    return state.departmentChildren;
  },
);
