import { createSelector } from '@ngrx/store';

import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { createSmartSelector } from '@davembush/dynamic-ngrx/selector/create-smart-selector.function';
import { ensureDataLoaded } from '@davembush/dynamic-ngrx/selector/ensure-data-loaded.function';
import { MarkAndDeleteSelector } from '@davembush/dynamic-ngrx/types/mark-and-delete-selector.type';

import { selectCurrentLocationId } from '../../current-location/current-location.selector';
import { selectSharedState } from '../../shared.selectors';
import { departmentActions } from '../department/department.actions';
import { selectDepartmentsChildren } from '../department/department.selector';
import { locationActions } from './location.actions';
import { Location } from './location.interface';

export const selectLocation = createSelector(selectSharedState, (state) => {
  if (!state.locations.ids.length) {
    // because we are using load and not loadById
    // this will load all the locations and the id just needs to have a value
    const id = 'xyz';
    ensureDataLoaded(state.locations, id, locationActions.load);
  }
  return state.locations;
});

export const selectLocationsDepartments = createSmartSelector<Location>(
  selectLocation,
  [
    {
      childAction: departmentActions.loadByIds,
      childName: 'children',
      childSelector: castTo<MarkAndDeleteSelector>(selectDepartmentsChildren),
      defaultChildRow: {
        id: '',
        name: 'departments',
        children: [],
        lastUpdate: 0,
      },
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
        children: [],
        isDirty: false,
      }
    );
  },
);
