// jscpd:ignore-start
// intentionally duplicated.
console.log('selectLocations is loaded');
import { computed, Signal } from '@angular/core';

import { Location } from '../../../../../shared/locations/location.interface';
import { selectTopLocations } from '../../top/select-top-locations.selectors';

export function selectLocations(): Signal<Location[]> {
  return computed(function selectLocationsFunction() {
    const tops = selectTopLocations();
    // Instead of directly accessing .locations, we should get the full entity
    // which will trigger the smart signal chain
    if (tops.ids.length === 1) {
      const topEntity = tops.entities[tops.ids[0]];
      if (topEntity) {
        // This will now use the smart signal chain through selectLocationsDepartments
        return topEntity.locations as Location[];
      }
    }
    return [] as Location[];
  });
}
// jscpd:ignore-end
