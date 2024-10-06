import { createSelector } from '@ngrx/store';
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { featureName } from '../../feature.const';
import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeStandardState } from '../tree-standard-state.selectors';

export const selectDepartments = createSelector(
  selectTreeStandardState,
  (state) => {
    return state.departments;
  },
);

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
