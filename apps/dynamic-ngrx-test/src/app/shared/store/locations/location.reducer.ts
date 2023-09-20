import { reducerFactory } from '@davembush/dynamic-ngrx/reducers/reducer.factory';

import { Location } from './location.interface';

export const locationReducer = reducerFactory(
  'Location',
  (id) =>
    ({
      id,
      name: '',
      children: [],
      isDirty: false,
    } as Location)
);
