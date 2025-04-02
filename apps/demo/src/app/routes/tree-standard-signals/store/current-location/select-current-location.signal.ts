import { computed, Signal } from '@angular/core';

import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { currentLocationSignalStore } from './current-location.signal-store';

// Define the store instance type to properly type the parameter
type CurrentLocationStore = InstanceType<typeof currentLocationSignalStore>;

export function selectCurrentLocationSignal(
  store: CurrentLocationStore,
): Signal<{
  id: string;
  name: string;
  departments: unknown[];
}> {
  return computed(function selectCurrentLocation() {
    const currentLocationId = store.selectCurrentLocationId();

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
  });
}
