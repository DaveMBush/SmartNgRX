// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { selectCurrentLocationId } from '../../current-location/select-current-location.selectors';
import { selectLocationsDepartments } from './select-locations-departments.selectors';
import { Location } from '../../../../../shared/locations/location.interface';

export const selectCurrentLocation = createSelector(
  selectLocationsDepartments,
  selectCurrentLocationId,
  function selectCurrentLocationFunction(locations, id) {
    return (
      locations.entities[id] ??
      ({
        id,
        name: '',
        departments: [],
      } as Location)
    );
  },
);
// jscpd:ignore-end
