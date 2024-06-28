// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';

import { selectCurrentLocationId } from '../current-location/current-location.selector';
import { selectDepartmentsChildren } from '../department/department.selector';
import { selectTreeNoDirtyState } from '../tree-no-dirty.selectors';

export const selectLocationEntities = createSelector(
  selectTreeNoDirtyState,
  (state) => {
    return state.locations;
  },
);

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      childFeature: 'tree-no-dirty',
      childEntity: 'departments',
      parentFeature: 'tree-no-dirty',
      parentEntity: 'locations',
      parentField: 'departments',
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
        isDirty: false,
      }
    );
  },
);
// jscpd:ignore-end
