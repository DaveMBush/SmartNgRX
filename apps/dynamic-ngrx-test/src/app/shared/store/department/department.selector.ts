import { createSelector } from '@ngrx/store';

import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { createSmartSelector } from '@davembush/dynamic-ngrx/selector/create-smart-selector.function';
import { MarkAndDeleteSelector } from '@davembush/dynamic-ngrx/types/mark-and-delete-selector.type';

import { selectSharedState2 } from '../../shared.selectors';
import { departmentChildActions } from '../department-children/department-child.actions';
import { selectDepartmentChildren } from '../department-children/department-child.selector';
import { Department } from './department.interface';

export const selectDepartments = createSelector(selectSharedState2, (state) => {
  return state.departments;
});

export const selectDepartmentsChildren = createSmartSelector<Department>(
  // parent table selector
  selectDepartments,
  [
    {
      childAction: departmentChildActions.loadByIds,
      childName: 'children',
      childSelector: castTo<MarkAndDeleteSelector>(selectDepartmentChildren),
      defaultChildRow: {
        id: '',
        name: 'children',
        children: [],
        isDirty: false,
      },
    },
  ],
);
