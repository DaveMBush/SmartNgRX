// jscpd:ignore-start
// intentionally duplicated.
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntityState } from '@ngrx/entity';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  createStore,
  rootInjector,
  setState,
  SmartNgRXRowBase,
  store,
} from '@smarttools/smart-ngrx';
import { firstValueFrom } from 'rxjs';

import { Location } from '../../../../../shared/locations/location.interface';
import { currentLocationSignalStore } from '../../current-location/current-location.signal-store';

const location1string = 'Location 1';

describe('Location Selectors', () => {
  let injector: EnvironmentInjector;
  let selectCurrentLocationId: MemoizedSelector<object, string>;
  let selectCurrentLocation: MemoizedSelector<object, Location>;
  let selectLocationsDepartments: MemoizedSelector<
    object,
    EntityState<Location & SmartNgRXRowBase>
  >;

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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({
          initialState: {
            'tree-standard-signals': {
              locations: initialState,
            },
          },
        }),
      ],
    });

    injector = TestBed.inject(EnvironmentInjector);
    rootInjector.set(injector);
    createStore();

    // Import selectors after injector is set
    const currentLocationIdModule = await import(
      '../../current-location/select-current-location-id.selectors'
    );
    const currentLocationModule = await import(
      './select-current-location.selectors'
    );
    const locationsDepartmentsModule = await import(
      './select-locations-departments.selectors'
    );

    selectCurrentLocationId = currentLocationIdModule.selectCurrentLocationId;
    selectCurrentLocation = currentLocationModule.selectCurrentLocation;
    selectLocationsDepartments =
      locationsDepartmentsModule.selectLocationsDepartments;

    setState('tree-standard-signals', 'locations', initialState);
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
    const currentLocationSignal = injector.get(currentLocationSignalStore);
    currentLocationSignal.setCurrentLocationId('1');
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
      id: '1',
      name: 'Location 1',
      departments: [],
    };

    const currentLocationSignal = injector.get(currentLocationSignalStore);
    currentLocationSignal.setCurrentLocationId('2');
    (store() as MockStore).refreshState();

    const location = await firstValueFrom(
      store().select(selectCurrentLocation),
    );
    expect(location).toEqual(expected);
  });
});
// jscpd:ignore-end
