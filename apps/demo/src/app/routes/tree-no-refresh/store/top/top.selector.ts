// jscpd:ignore-start
// intentionally duplicated.
import { createSelector } from '@ngrx/store';
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { Location } from '../../../../shared/locations/location.interface';
import { selectLocationsDepartments } from '../locations/location.selectors';
import { selectTreeNoRefreshState } from '../tree-no-refresh.selectors';

export const selectTopEntities = createSelector(
  selectTreeNoRefreshState,
  function selectTopEntitiesFunction(state) {
    return state.top;
  },
);

export const selectTopLocations = createSmartSelector(selectTopEntities, [
  {
    childFeature: 'tree-no-refresh',
    childEntity: 'locations',
    parentField: 'locations',
    parentFeature: 'tree-no-refresh',
    parentEntity: 'top',
    childSelector: selectLocationsDepartments,
  },
]);

// It seems logical to put selectLocations in the locations.selectors.ts
// but that causes a circular reference
export const selectLocations = createSelector(
  selectTopLocations,
  function selectLocationsFunction(tops) {
    return (
      tops.ids.length === 1 ? tops.entities[tops.ids[0]]!.locations : []
    ) as Location[];
  },
);
// jscpd:ignore-end
