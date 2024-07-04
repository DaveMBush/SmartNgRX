// jscpd:ignore-start
// intentionally duplicated.
import { MockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';

import { createStore, setState, store } from '@smart/smart-ngrx';

import { selectCurrentLocationId } from '../current-location/current-location.selector';
import {
  selectCurrentLocation,
  selectLocationsDepartments,
} from './location.selectors';

const location1string = 'Location 1';

describe('Location Selectors', () => {
  const initialState = {
    entities: {
      '1': {
        id: '1',
        name: location1string,
        departments: [],
        isDirty: false,
      },
    },
    ids: ['1'],
  };

  beforeEach(() => {
    createStore();
    setState('tree-standard', 'locations', initialState);
    setState('tree-standard2', 'currentLocation', '1');
    (store() as MockStore).overrideSelector(selectLocationsDepartments, {
      entities: {
        1: { id: '1', name: location1string, departments: [], isDirty: false },
      },
      ids: ['1'],
    });
    (store() as MockStore).overrideSelector(selectCurrentLocationId, '1');
  });

  it('should select the current location', async () => {
    const expected = {
      id: '1',
      name: location1string,
      departments: [],
      isDirty: false,
    };

    const location = await firstValueFrom(
      store().select(selectCurrentLocation),
    );
    expect(location).toEqual(expected);
  });

  it('should return default location if id does not exist', async () => {
    const expected = {
      id: '2',
      name: '',
      departments: [],
    };

    (store() as MockStore).overrideSelector(selectCurrentLocationId, '2');
    (store() as MockStore).refreshState();

    const location = await firstValueFrom(
      store().select(selectCurrentLocation),
    );
    expect(location).toEqual(expected);
  });
});
// jscpd:ignore-end
