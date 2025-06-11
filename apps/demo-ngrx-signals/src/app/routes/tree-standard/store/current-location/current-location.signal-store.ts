import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { selectLocations } from '../locations/selectors/select-locations.selectors';
import { TreeStandardState2 } from '../tree-standard-state2.interface';

export const currentLocationSignalStore = signalStore(
  { providedIn: 'root' },
  withState({
    currentLocationId: '',
  } as TreeStandardState2),
  withMethods(function withMethodsFunction(store) {
    return {
      setCurrentLocationId: function setCurrentLocationId(
        currentLocationId: string,
      ): void {
        patchState(store, function setCurrentLocationIdPatch(state) {
          return { ...state, currentLocationId };
        });
      },
    };
  }),
  withComputed(function computedFunction({ currentLocationId }) {
    const locationsSignal = selectLocations();

    return {
      selectCurrentLocationId: computed(
        function selectCurrentLocationIdComputedFunction(): string {
          const locations = locationsSignal;
          if (currentLocationId().length > 0) {
            return currentLocationId();
          }
          if (locations.length > 0 && typeof locations[0] === 'object') {
            return locations[0].id;
          }
          return '';
        },
      ),
    };
  }),
);
