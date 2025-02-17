import { signalTokenToSelector } from '@smarttools/smart-ngrx';

import { currentLocationSignalStore } from './current-location.signal-store';

export const selectCurrentLocationId = signalTokenToSelector(
  currentLocationSignalStore,
  function currentLocationIdProjector(store) {
    console.log(
      'currentLocationIdProjector - currentLocationId',
      store.selectCurrentLocationId(),
    );
    return store.selectCurrentLocationId;
  },
);
