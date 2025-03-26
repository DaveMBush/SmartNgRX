// jscpd:ignore-start
// intentionally duplicated.
import { createSmartSignal } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';
import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';
import { featureName } from '../../feature.const';

export const selectDepartmentsChildren = createSmartSignal<
  Department,
  DepartmentChild
>([
  {
    type: 'Signal',
    childFeature: featureName,
    childEntity: 'departmentChildren',
    parentFeature: featureName,
    parentEntity: 'departments',
    parentField: 'children',
  },
]);
// jscpd:ignore-end
