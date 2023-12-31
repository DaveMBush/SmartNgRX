// jscpd:ignore-start
// intentionally duplicated because it is for different state for demo purposes
import { createSelector } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';
import { MarkAndDeleteSelector } from '@smart/smart-ngrx/types/mark-and-delete-selector.type';

import { Location } from '../../../../shared/locations/location.interface';
import { selectCurrentLocationId } from '../current-location/current-location.selector';
import { selectDepartmentsChildren } from '../department/department.selector';
import { selectTreeNoRemoveState } from '../tree-no-remove.selectors';

export const selectLocationEntities = createSelector(
  selectTreeNoRemoveState,
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
      childFeature: 'tree-no-remove',
      childEntity: 'departments',
      parentField: 'departments',
      childSelector: castTo<MarkAndDeleteSelector>(selectDepartmentsChildren),
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
