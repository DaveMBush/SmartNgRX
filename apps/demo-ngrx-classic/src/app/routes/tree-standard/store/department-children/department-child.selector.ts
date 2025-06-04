import { createSmartSelector } from '@smarttools/smart-ngrx';

import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';

export const selectDepartmentChildren = createSmartSelector<DepartmentChild>(
  'tree-standard',
  'departmentChildren',
);
