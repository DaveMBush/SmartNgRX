import { createSelector } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';
import { SmartNgRXRowBaseSelector } from '@smart/smart-ngrx/types/smart-ngrx-row-base-selector.type';

import { Department } from '../../../../shared/department/department.interface';
import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeNoRefreshState } from '../tree-no-refresh.selectors';

export const selectDepartments = createSelector(
  selectTreeNoRefreshState,
  (state) => {
    return state.departments;
  },
);

export const selectDepartmentsChildren = createSmartSelector<Department>(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: 'tree-no-refresh',
      childEntity: 'departmentChildren',
      parentFeature: 'tree-no-refresh',
      parentEntity: 'departments',
      parentField: 'children',
      childSelector: castTo<SmartNgRXRowBaseSelector>(selectDepartmentChildren),
    },
  ],
);
