import { createSelector } from '@ngrx/store';
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeNoRemoveState } from '../tree-no-remove.selectors';

export const selectDepartments = createSelector(
  selectTreeNoRemoveState,
  (state) => {
    return state.departments;
  },
);

export const selectDepartmentsChildren = createSmartSelector(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: 'tree-no-remove',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-no-remove',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: selectDepartmentChildren,
    },
  ],
);
