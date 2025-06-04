import { createSmartSelector } from '@smarttools/smart-ngrx';

export const selectDepartmentChildren = createSmartSelector(
  'tree-standard',
  'departmentChildren',
);
