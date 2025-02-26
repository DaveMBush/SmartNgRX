import { computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { rootInjector } from '@smarttools/smart-ngrx';

import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { currentLocationSignalStore } from './current-location.signal-store';

export const selectCurrentLocationSignal = computed(
  function selectCurrentLocation() {
    const injector = rootInjector.get();
    const currentLocation = injector.get(currentLocationSignalStore);
    const store = injector.get(Store);
    const currentLocationId = currentLocation.selectCurrentLocationId();
    const locationDepartmentsSignal = store.selectSignal(selectLocationsDepartments);
    const entities = locationDepartmentsSignal().entities;
    return (
      entities[currentLocationId] ?? {
        id: '',
        name: '',
        departments: [],
      }
    );
  },
);
