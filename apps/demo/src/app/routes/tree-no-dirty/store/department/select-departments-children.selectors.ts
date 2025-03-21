import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectDepartments } from './select-departments.selectors';

export const selectDepartmentsChildren = createSmartSelector(
  // parent table selector
  selectDepartments,
  [
    {
      type: 'NgRX',
      childFeature: 'tree-no-dirty',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-no-dirty',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: selectDepartmentChildren,
    },
  ],
);
