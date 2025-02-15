import { signalToSelector } from "@smarttools/smart-ngrx";

import { currentLocationSignalStore } from "./current-location.signal-store";

const store = new currentLocationSignalStore();

export const selectCurrentLocationId = signalToSelector(
  store.selectCurrentLocationId,
);
