// jscpd:ignore-start
// intentionally duplicated.

import { computed } from '@angular/core';

import { Location } from '../../../../../shared/locations/location.interface';
import { selectTopLocations } from '../../top/select-top-locations.selectors';

export const selectLocations = computed(() => {
  const tops = selectTopLocations();
  return (
    tops.ids.length === 1 ? tops.entities[tops.ids[0]]!.locations : []
  ) as Location[];
});
// jscpd:ignore-end
