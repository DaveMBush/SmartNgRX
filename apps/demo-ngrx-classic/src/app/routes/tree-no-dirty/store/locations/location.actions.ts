import { actionFactory } from '@smarttools/smart-ngrx';

// this illustrates how you can access the actions from smart-ngrx
// so you can use them in your own code which we do in current-location.effect.ts
// so we can listen to when the locations are set so we can update the
// current location id in the store
export const locationActions = actionFactory('tree-no-dirty', 'locations');
