import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Store } from '@ngrx/store';

import { selectLocationEntities } from '../../../tree-standard/store/locations/selectors/select-location-entities.selectors';
import { TreeStandardSignalsState2 } from '../tree-standard-signals-state2.interface';

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
    s = inject(Store),
  ) {
    return {
      selectCurrentLocationId: computed(
        function selectCurrentLocationIdComputedFunction(): string {
          const locationEntities = s.selectSignal(selectLocationEntities)();
          if (currentLocationId().length > 0) {
            return currentLocationId();
          }
          if (locationEntities.ids.length > 0) {
            return locationEntities.ids[0] as string;
          }
          return '';
        },
      ),
    };
  }),
);
