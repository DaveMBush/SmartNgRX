import { createSelector } from "@ngrx/store";

import { selectCurrentLocationSignal } from "./select-current-location-signal.selectors";

export const selectCurrentLocationId = createSelector(
  selectCurrentLocationSignal,
  function selectCurrentLocationIdProjector(currentLocation: {
    currentLocationId: string;
  }) {
    return currentLocation.currentLocationId;
  },
);
