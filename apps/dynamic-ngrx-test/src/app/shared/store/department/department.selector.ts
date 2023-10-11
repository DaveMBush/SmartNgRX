import { createSelector } from '@ngrx/store';

import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { createSmartSelector } from '@davembush/dynamic-ngrx/selector/create-smart-selector.function';
import { MarkAndDeleteSelector } from '@davembush/dynamic-ngrx/types/mark-and-delete-selector.type';

import { selectSharedState } from '../../shared.selectors';
import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { Department } from './department.interface';

export const selectDepartments = createSelector(selectSharedState, (state) => {
  return state.departments;
});

export const selectDepartmentsChildren = createSmartSelector<Department>(
  // parent table selector
  selectDepartments,
  [
    {
      childFeature: 'shared',
      childFieldName: 'departmentChildren',
      parentFieldName: 'children',
      childSelector: castTo<MarkAndDeleteSelector>(selectDepartmentChildren),
    },
  ],
);
