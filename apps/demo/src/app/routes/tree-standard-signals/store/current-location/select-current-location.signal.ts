import { computed } from '@angular/core';
import { rootInjector } from '@smarttools/smart-ngrx';

import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { currentLocationSignalStore } from './current-location.signal-store';

export const selectCurrentLocationSignal = computed(
  function selectCurrentLocation() {
    const injector = rootInjector.get();
    const currentLocation = injector.get(currentLocationSignalStore);
    const currentLocationId = currentLocation.selectCurrentLocationId();

    // First get the location with departments
    const locationDepartmentsSignal = selectLocationsDepartments;
    const locationState = locationDepartmentsSignal();

    const location = locationState.entities[currentLocationId];

    if (location) {
      // The departments array should automatically handle its child signals
      const departments = location.departments;

      return {
        ...location,
        departments,
      };
    }

    return {
      id: '',
      name: '',
      departments: [],
    };
  },
);
