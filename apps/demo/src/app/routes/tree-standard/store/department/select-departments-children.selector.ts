import { createSmartSelector } from '@smarttools/smart-ngrx';

import { featureName } from '../../feature.const';
import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectDepartments } from './select-departments.selector';

export const selectDepartmentsChildren = createSmartSelector(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: featureName,
      childEntity: 'departmentChildren',
      parentFeature: featureName,
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: selectDepartmentChildren,
    },
  ],
);
