// jscpd:ignore-start
// intentionally duplicated.
console.log('selectLocations is loaded');
import { computed, Signal } from '@angular/core';

import { Location } from '../../../../../shared/locations/location.interface';
import { selectTopLocations } from '../../top/select-top-locations.selectors';


export function selectLocations(): Signal<Location[]> {

  return computed(function selectLocationsFunction() {
    const tops = selectTopLocations();
    const locations =
      tops.ids.length === 1 ? tops.entities[tops.ids[0]]!.locations : [];
    return locations as Location[];
  });
}
// jscpd:ignore-end
