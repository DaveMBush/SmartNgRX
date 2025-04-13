import { createActionGroup, props } from '@ngrx/store';

export const currentLocationActions = createActionGroup({
  source: 'Current Location',
  events: {
    Set: props<{ id: string }>(),
  },
});
