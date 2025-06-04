import { createSmartSelector } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';

export const selectDepartments = createSmartSelector<Department>(
  'tree-no-dirty',
  'departments',
);
