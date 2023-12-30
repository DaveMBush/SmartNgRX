import { createActionGroup, props } from '@ngrx/store';

export const currentLocationActions = createActionGroup({
  source: 'Tree No Dirty Current Location',
  events: {
    Set: props<{ id: string }>(),
  },
});
