import {
  signalTokenToSelector
} from '@smarttools/smart-ngrx';

import { currentLocationSignalStore } from './current-location.signal-store';

export const selectCurrentLocationSignal = signalTokenToSelector(
  currentLocationSignalStore,
  function currentLocationIdProjector(store) {
    return store.currentLocationId;
  },
);
