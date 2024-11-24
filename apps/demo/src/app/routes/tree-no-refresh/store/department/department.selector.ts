import { createSelector } from '@ngrx/store';
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeNoRefreshState } from '../tree-no-refresh.selectors';

export const selectDepartments = createSelector(
  selectTreeNoRefreshState,
  function selectDepartmentsFunction(state) {
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
