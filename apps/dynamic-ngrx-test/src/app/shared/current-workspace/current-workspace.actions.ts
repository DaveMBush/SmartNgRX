import { createActionGroup, props } from '@ngrx/store';

export const currentWorkspaceActions = createActionGroup({
  source: 'Current Workspace',
  events: {
    Set: props<{ id: string }>(),
  },
});
