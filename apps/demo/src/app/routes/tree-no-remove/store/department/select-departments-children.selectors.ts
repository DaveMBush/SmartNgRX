import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentChildren } from '../department-children/select-department-children.selectors';
import { selectDepartments } from './select-department.selectors';

export const selectDepartmentsChildren = createSmartSelector(
  selectDepartments,
  [
    {
      type: 'NgRX',
      childFeature: 'tree-no-remove',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-no-remove',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: selectDepartmentChildren,
    },
  ],
);
