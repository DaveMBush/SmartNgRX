// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { Location } from '../../../../../shared/locations/location.interface';
import { selectTopLocations } from '../../top/select-top-locations.selector';

export const selectLocations = createSelector(
  selectTopLocations,
  function selectLocationsFunction(tops) {
    return (
      tops.ids.length === 1
        ? tops.entities[tops.ids[0]]!.locations
        : ([] as Location[])
    ) as Location[];
  },
);
// jscpd:ignore-end
