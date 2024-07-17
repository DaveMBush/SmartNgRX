// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { selectCurrentLocationId } from '../current-location/current-location.selector';
import { selectDepartmentsChildren } from '../department/department.selector';
import { selectTreeStandardVirtualState } from '../tree-standard-virtual-state.selectors';

export const selectLocationEntities = createSelector(
  selectTreeStandardVirtualState,
  (state) => {
    return state.locations;
  },
);

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      childFeature: 'tree-standard-virtual',
      childEntity: 'departments',
      parentField: 'departments',
      parentFeature: 'tree-standard-virtual',
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
