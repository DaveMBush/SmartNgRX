import { computed } from '@angular/core';
import { rootInjector } from '@smarttools/smart-ngrx';

import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { currentLocationSignalStore } from './current-location.signal-store';

export const selectCurrentLocationSignal = computed(
  function selectCurrentLocation() {
    const injector = rootInjector.get();
    const currentLocation = injector.get(currentLocationSignalStore);
    const currentLocationId = currentLocation.selectCurrentLocationId();
    const locationDepartmentsSignal = selectLocationsDepartments;
    const entities = locationDepartmentsSignal()().entities;
    return (
      entities[currentLocationId] ?? {
        id: '',
        name: '',
        departments: [],
      }
    );
  },
);
