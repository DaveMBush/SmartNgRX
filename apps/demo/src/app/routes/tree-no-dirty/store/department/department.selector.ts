import { createSelector } from '@ngrx/store';

import { createSmartSelector } from '@smart/smart-ngrx';

import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeNoDirtyState } from '../tree-no-dirty.selectors';

export const selectDepartments = createSelector(
  selectTreeNoDirtyState,
  (state) => {
    return state.departments;
  },
);

export const selectDepartmentsChildren = createSmartSelector(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: 'tree-no-dirty',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-no-dirty',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: selectDepartmentChildren,
    },
  ],
);
