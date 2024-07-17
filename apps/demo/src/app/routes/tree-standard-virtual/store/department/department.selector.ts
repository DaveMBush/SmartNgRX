import { createSelector } from '@ngrx/store';
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeStandardVirtualState } from '../tree-standard-virtual-state.selectors';

export const selectDepartments = createSelector(
  selectTreeStandardVirtualState,
  (state) => {
    return state.departments;
  },
);

export const selectDepartmentsChildren = createSmartSelector(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: 'tree-standard-virtual',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-standard-virtual',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: selectDepartmentChildren,
    },
  ],
);
