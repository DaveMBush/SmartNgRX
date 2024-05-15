import { createSelector } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';
import { SmartNgRXRowBaseSelector } from '@smart/smart-ngrx/types/smart-ngrx-row-base-selector.type';

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
      childFeature: 'tree-standard',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-standard',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: castTo<SmartNgRXRowBaseSelector>(selectDepartmentChildren),
    },
  ],
);
