import { createSelector } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';
import { MarkAndDeleteSelector } from '@smart/smart-ngrx/types/mark-and-delete-selector.type';

import { Department } from '../../../../shared/department/department.interface';
import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { selectTreeStandardState } from '../tree-standard-state.selectors';

export const selectDepartments = createSelector(
  selectTreeStandardState,
  (state) => {
    return state.departments;
  },
);

export const selectDepartmentsChildren = createSmartSelector<Department>(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: 'tree-standard',
      childEntity: 'departmentChildren',
      parentField: 'children',
      childSelector: castTo<MarkAndDeleteSelector>(selectDepartmentChildren),
    },
  ],
);
