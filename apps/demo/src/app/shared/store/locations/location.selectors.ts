import { createSelector } from '@ngrx/store';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { createSmartSelector } from '@smart/smart-ngrx/selector/create-smart-selector.function';
import { MarkAndDeleteSelector } from '@smart/smart-ngrx/types/mark-and-delete-selector.type';

import { selectCurrentLocationId } from '../../current-location/current-location.selector';
import { selectSharedState } from '../../shared.selectors';
import { selectDepartmentsChildren } from '../department/department.selector';
import { Location } from './location.interface';

export const selectLocationEntities = createSelector(
  selectSharedState,
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
      childFeature: 'shared',
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
