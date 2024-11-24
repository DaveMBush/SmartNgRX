// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';
import { createSmartSelector } from '@smarttools/smart-ngrx';

import { featureName } from '../../feature.const';
import { selectCurrentLocationId } from '../current-location/current-location.selector';
import { selectDepartmentsChildren } from '../department/department.selector';
import { selectTreeStandardState } from '../tree-standard-state.selectors';

export const selectLocationEntities = createSelector(
  selectTreeStandardState,
  function selectLocationEntitiesFunction(state) {
    return state.locations;
  },
);

export const selectLocationsDepartments = createSmartSelector(
  selectLocationEntities,
  [
    {
      childFeature: featureName,
      childEntity: 'departments',
      parentField: 'departments',
      parentFeature: featureName,
      parentEntity: 'locations',
      childSelector: selectDepartmentsChildren,
    },
  ],
);

export const selectCurrentLocation = createSelector(
  selectLocationsDepartments,
  selectCurrentLocationId,
  function selectCurrentLocationFunction(locations, id) {
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
