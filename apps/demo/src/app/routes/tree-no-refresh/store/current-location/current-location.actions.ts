import { createActionGroup, props } from '@ngrx/store';

export const currentLocationActions = createActionGroup({
  source: 'Tree No Refresh Current Location',
  events: {
    Set: props<{ id: string }>(),
  },
});
