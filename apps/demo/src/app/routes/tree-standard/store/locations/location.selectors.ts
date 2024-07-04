// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { createSmartSelector } from '@smart/smart-ngrx';

import { selectCurrentLocationId } from '../current-location/current-location.selector';
import { selectDepartmentsChildren } from '../department/department.selector';
import { selectTreeStandardState } from '../tree-standard-state.selectors';

export const selectLocationEntities = createSelector(
  selectTreeStandardState,
  (state) => {
    return state.locations;
  },
);

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      childFeature: 'tree-standard',
      childEntity: 'departments',
      parentField: 'departments',
      parentFeature: 'tree-standard',
      parentEntity: 'locations',
      childSelector: selectDepartmentsChildren,
    },
  ],
);

export const selectCurrentLocation = createSelector(
  selectLocationsDepartments,
  selectCurrentLocationId,
  (locations, id) => {
    return (
      locations.entities[id] ?? {
        id,
        name: '',
        departments: [],
      }
    );
  },
);
// jscpd:ignore-end
