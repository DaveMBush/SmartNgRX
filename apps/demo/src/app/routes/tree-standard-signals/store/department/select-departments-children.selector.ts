// jscpd:ignore-start
// intentionally duplicated.
import { createSmartSignal } from '@smarttools/smart-ngrx';

import { featureName } from '../../feature.const';
import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectDepartments } from './select-departments.selector';

export const selectDepartmentsChildren = createSmartSignal(selectDepartments, [
  {
    type: 'Signal',
    childFeature: featureName,
    childEntity: 'departmentChildren',
    parentFeature: featureName,
    parentEntity: 'departments',
    parentField: 'children',
    childSelector: selectDepartmentChildren,
  },
]);
// jscpd:ignore-end
