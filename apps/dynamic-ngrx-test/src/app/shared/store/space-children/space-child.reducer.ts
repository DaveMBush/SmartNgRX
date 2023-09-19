import { reducerFactory } from '@davembush/dynamic-ngrx/reducers/reducer.factory';

import { SpaceChild } from './space-child.interface';

export const spaceChildReducer = reducerFactory(
  'SpaceChild',
  (id) =>
    ({
      id,
      name: '',
      children: [],
      isDirty: false,
    } as SpaceChild)
);
