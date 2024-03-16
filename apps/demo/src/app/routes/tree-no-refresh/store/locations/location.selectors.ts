// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';
import { SmartNgRXRowBaseSelector } from '@smart/smart-ngrx/types/smart-ngrx-row-base-selector.type';

import { Location } from '../../../../shared/locations/location.interface';
import { selectCurrentLocationId } from '../current-location/current-location.selector';
import { selectDepartmentsChildren } from '../department/department.selector';
import { selectTreeNoRefreshState } from '../tree-no-refresh.selectors';

export const selectLocationEntities = createSelector(
  selectTreeNoRefreshState,
  (state) => {
    return state.locations;
  },
);

export const selectLocations = createSelector(
  selectLocationEntities,
  (locations) => {
    return locations.ids.map((id) => locations.entities[id]) as Location[];
  },
);

export const selectLocationsDepartments = createSmartSelector<Location>(
  selectLocationEntities,
  [
    {
      childFeature: 'tree-no-refresh',
      childEntity: 'departments',
      parentFeature: 'tree-no-refresh',
      parentEntity: 'locations',
      parentField: 'departments',
      childSelector: castTo<SmartNgRXRowBaseSelector>(
        selectDepartmentsChildren,
      ),
    },
  ],
);

export const selectCurrentLocation = createSelector(
  selectLocationsDepartments,
  selectCurrentLocationId,
  (locations, id) => {
    return (
      locations.entities[id] ?? {
        id: '',
        name: '',
        departments: [],
        isDirty: false,
      }
    );
  },
);
// jscpd:ignore-end
