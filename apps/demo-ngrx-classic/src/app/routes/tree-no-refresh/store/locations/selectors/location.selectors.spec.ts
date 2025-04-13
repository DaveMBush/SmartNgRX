// jscpd:ignore-start
// intentionally duplicated.
import { MockStore } from '@ngrx/store/testing';
import { createStore, setState, store } from '@smarttools/smart-ngrx';
import { firstValueFrom } from 'rxjs';

import { selectCurrentLocationId } from '../../current-location/current-location.selector';
import { selectCurrentLocation } from './select-current-location.selectors';
import { selectLocationsDepartments } from './select-locations-departments.selectors';

const location1string = 'Location 1';

describe('Location Selectors', () => {
  const initialState = {
    entities: {
      '1': {
        id: '1',
        name: location1string,
        departments: [],
      },
    },
    ids: ['1'],
  };

  beforeEach(() => {
    createStore();
    setState('tree-no-refresh', 'locations', initialState);
    setState('tree-no-refresh2', 'currentLocation', '1');
    (store() as MockStore).overrideSelector(selectLocationsDepartments, {
      entities: {
        1: {
          id: '1',
          name: location1string,
          departments: [],
        },
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
