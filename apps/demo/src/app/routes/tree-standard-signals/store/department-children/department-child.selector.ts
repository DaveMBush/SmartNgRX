import { createSmartSignal } from '@smarttools/smart-ngrx';

import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';
import { featureName } from '../../feature.const';

export const selectDepartmentChildren = createSmartSignal<DepartmentChild>(
  featureName,
  'departmentChildren',
);
