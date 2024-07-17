// jscpd:ignore-start
// intentionally duplicated.
import { createSelector } from '@ngrx/store';
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { selectLocationsDepartments } from '../locations/location.selectors';
import { selectTreeStandardVirtualState } from '../tree-standard-virtual-state.selectors';

export const selectTopEntities = createSelector(
  selectTreeStandardVirtualState,
  (state) => {
    return state.top;
  },
);

export const selectTopLocations = createSmartSelector(selectTopEntities, [
  {
    childFeature: 'tree-standard-virtual',
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: 'tree-standard-virtual',
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);

// It seems logical to put selectLocations in the locations.selectors.ts
// but that causes a circular reference
export const selectLocations = createSelector(selectTopLocations, (tops) => {
  return (
    tops.ids.length === 1 ? tops.entities[tops.ids[0]]!.locations : []
  ) as Location[];
});
// jscpd:ignore-end
