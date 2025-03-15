import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Store } from '@ngrx/store';

import { selectLocationEntities } from '../locations/selectors/select-location-entities.selectors';
import { TreeStandardSignalsState2 } from '../tree-standard-signals-state2.interface';
import { selectLocations } from '../locations/selectors/select-locations.selector';

export const currentLocationSignalStore = signalStore(
  { providedIn: 'root' },
  withState({
    currentLocationId: '',
  } as TreeStandardSignalsState2),
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
  withComputed(function computedFunction(
    { currentLocationId },
  ) {
    return {
      selectCurrentLocationId: computed(
        function selectCurrentLocationIdComputedFunction(): string {
          const locations= selectLocations();
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
