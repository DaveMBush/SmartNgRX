import { reducerFactory } from '@davembush/dynamic-ngrx/reducers/reducer.factory';

import { Department } from './department.interface';

export const departmentReducer = reducerFactory(
  'Department',
  (id) =>
    ({
      id,
      name: '',
      children: [],
      isDirty: false,
    } as Department)
);
