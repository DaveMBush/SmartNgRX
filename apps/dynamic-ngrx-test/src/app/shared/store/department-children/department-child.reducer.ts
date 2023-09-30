import { reducerFactory } from '@davembush/dynamic-ngrx/reducers/reducer.factory';

import { DepartmentChild } from './department-child.interface';

export const departmentChildReducer = reducerFactory(
  'DepartmentChild',
  (id) =>
    ({
      id,
      name: '',
      children: [],
      isDirty: false,
    }) as DepartmentChild,
);
