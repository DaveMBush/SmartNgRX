import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectDepartments } from './select-departments.selector';

export const selectDepartmentsChildren = createSmartSelector(
  // parent table selector
  selectDepartments,
  [
    {
      type: 'NgRX',
      childFeature: 'tree-no-refresh',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-no-refresh',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: selectDepartmentChildren,
    },
  ],
);
