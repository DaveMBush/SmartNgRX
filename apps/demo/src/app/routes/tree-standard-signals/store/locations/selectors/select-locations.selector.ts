// jscpd:ignore-start
// intentionally duplicated.

import { computed } from '@angular/core';

import { selectTopLocations } from '../../top/select-top-locations.selectors';

export const selectLocations = computed(function selectLocationsFunction() {
  const tops = selectTopLocations();
  return (
    tops.ids.length === 1 ? tops.entities[tops.ids[0]]!.locations : []
  );
});
// jscpd:ignore-end
