// jscpd:ignore-start
// intentionally duplicated.
import { createSelector } from '@ngrx/store';

import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';

import { Location } from '../../../../shared/locations/location.interface';
import { selectLocationsDepartments } from '../locations/location.selectors';
import { selectTreeStandardState } from '../tree-standard-state.selectors';

export const selectTopEntities = createSelector(
  selectTreeStandardState,
  (state) => {
    return state.top;
  },
);

export const selectTopLocations = createSmartSelector(selectTopEntities, [
  {
    childFeature: 'tree-standard',
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: 'tree-standard',
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
