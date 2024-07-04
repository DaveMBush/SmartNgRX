// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { createSmartSelector } from '@smart/smart-ngrx';

import { selectCurrentLocationId } from '../current-location/current-location.selector';
import { selectDepartmentsChildren } from '../department/department.selector';
import { selectTreeNoRemoveState } from '../tree-no-remove.selectors';

export const selectLocationEntities = createSelector(
  selectTreeNoRemoveState,
  (state) => {
    return state.locations;
  },
);

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      childFeature: 'tree-no-remove',
      childEntity: 'departments',
      parentFeature: 'tree-no-remove',
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
      }
    );
  },
);
// jscpd:ignore-end
