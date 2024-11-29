import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentChildren } from '../../../tree-no-remove/store/department-children/select-department-children.selectors';
import { selectDepartments } from './select-departments.selectors';

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
