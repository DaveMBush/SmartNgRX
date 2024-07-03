import { createSelector } from '@ngrx/store';

import { createSmartSelector } from '@smart/smart-ngrx';

import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeNoRefreshState } from '../tree-no-refresh.selectors';

export const selectDepartments = createSelector(
  selectTreeNoRefreshState,
  (state) => {
    return state.departments;
  },
);

export const selectDepartmentsChildren = createSmartSelector(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: 'tree-no-refresh',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-no-refresh',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: selectDepartmentChildren,
    },
  ],
);
