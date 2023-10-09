import { createSelector } from '@ngrx/store';

import { selectSharedState2 } from '../../shared.selectors';

export const selectDepartmentChildren = createSelector(
  selectSharedState2,
  (state) => {
    return state.departmentChildren;
  },
);
