import { reducerFactory } from '@davembush/dynamic-ngrx/reducers/reducer.factory';

import { Space } from './space.interface';

export const spaceReducer = reducerFactory(
  'Space',
  (id) =>
    ({
      id,
      name: '',
      children: [],
      isDirty: false,
    } as Space)
);
