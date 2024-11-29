import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectDepartmentChildren } from '../../../tree-no-remove/store/department-children/select-department-children.selectors';
import { selectDepartments } from './select-departments.selector';

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
