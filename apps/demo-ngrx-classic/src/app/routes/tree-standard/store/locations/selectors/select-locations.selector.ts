// jscpd:ignore-start
// intentionally duplicated.
import { createSelector } from '@ngrx/store';

import { Location } from '../../../../../shared/locations/location.interface';
import { selectTopLocations } from '../../top/select-top-locations.selectors';

export const selectLocations = createSelector(
  selectTopLocations,
  function selectLocationsFunction(tops) {
    return (
      tops.ids.length === 1 ? tops.entities[tops.ids[0]]!.locations : []
    ) as Location[];
  },
);
// jscpd:ignore-end
