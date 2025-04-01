import { createSmartSignal } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';
import { featureName } from '../../feature.const';

export const selectDepartments = createSmartSignal<Department>(
  featureName,
  'departments',
);
