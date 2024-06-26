import { createSelector } from '@ngrx/store';

import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';

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
