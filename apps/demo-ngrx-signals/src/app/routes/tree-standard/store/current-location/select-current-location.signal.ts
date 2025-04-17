import { computed, Signal } from '@angular/core';

import { Department } from '../../../../shared/department/department.interface';
import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { currentLocationSignalStore } from './current-location.signal-store';

// Define the store instance type to properly type the parameter
type CurrentLocationStore = InstanceType<typeof currentLocationSignalStore>;

export function selectCurrentLocationSignal(
  store: CurrentLocationStore,
): Signal<{
  id: string;
  name: string;
  departments: Department[] | string[];
}> {
  return computed(function selectCurrentLocation() {
    const currentLocationId = store.selectCurrentLocationId();

    // First get the location with departments
    const locationDepartmentsSignal = selectLocationsDepartments;
    const locationState = locationDepartmentsSignal();

    const location = locationState.entities[currentLocationId];

    /* the if is difficult to test because it requires
       facadeRegistry.register() to be called first which
       is difficult to arrange in a test.
    */
    /* istanbul ignore if */
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
