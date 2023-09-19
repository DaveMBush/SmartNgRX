import { reducerFactory } from '@davembush/dynamic-ngrx/reducers/reducer.factory';

import { Workspace } from './workspace.interface';

export const workspaceReducer = reducerFactory(
  'Workspace',
  (id) =>
    ({
      id,
      name: '',
      children: [],
      isDirty: false,
    } as Workspace)
);
