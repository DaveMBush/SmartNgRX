// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { Location } from '../../../../../shared/locations/location.interface';
import { selectCurrentLocationId } from '../../current-location/select-current-location-id.selectors';
import { selectLocationsDepartments } from './select-locations-departments.selectors';

export const selectCurrentLocation = createSelector(
  selectLocationsDepartments,
  selectCurrentLocationId,
  function selectCurrentLocationFunction(locations, id) {
    return (
      locations.entities[id as string] ??
      ({
        id,
        name: '',
        departments: [],
      } as Location)
    );
  },
);
// jscpd:ignore-end
