import { createSelector } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';
import { MarkAndDeleteSelector } from '@smart/smart-ngrx/types/mark-and-delete-selector.type';

import { Department } from '../../../../shared/department/department.interface';
import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeNoDirtyState } from '../tree-no-dirty.selectors';

export const selectDepartments = createSelector(
  selectTreeNoDirtyState,
  (state) => {
    return state.departments;
  },
);

export const selectDepartmentsChildren = createSmartSelector<Department>(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: 'tree-no-dirty',
      childEntity: 'departmentChildren',
      parentField: 'children',
      childSelector: castTo<MarkAndDeleteSelector>(selectDepartmentChildren),
    },
  ],
);
