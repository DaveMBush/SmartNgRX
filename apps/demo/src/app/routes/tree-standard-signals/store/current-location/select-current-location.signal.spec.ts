import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntityState } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { rootInjector, SmartNgRXRowBase } from '@smarttools/smart-ngrx';

import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
import { currentLocationSignalStore } from './current-location.signal-store';
import { selectCurrentLocationSignal } from './select-current-location.signal';

interface LocationWithDepartments extends SmartNgRXRowBase {
  id: string;
  name: string;
  departments: string[];
}

describe('selectCurrentLocationSignal', () => {
  let store: MockStore;
  let currentLocationStoreMock: {
    selectCurrentLocationId: jest.Mock<string, []>;
  };
  let mockInjector: EnvironmentInjector;

  beforeEach(() => {
    currentLocationStoreMock = {
      selectCurrentLocationId: jest.fn<string, []>().mockReturnValue(''),
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            locations: {
              ids: [],
              entities: {},
            },
          },
        }),
        {
          provide: currentLocationSignalStore,
          useValue: currentLocationStoreMock,
        },
      ],
    });

    store = TestBed.inject(Store) as MockStore;
    mockInjector = {
      get: jest.fn().mockImplementation((token) => {
        if (token === Store) {
          return store;
        }
        if (token === currentLocationSignalStore) {
          return currentLocationStoreMock;
        }
        return undefined;
      }),
      runInContext: jest.fn(),
      destroy: jest.fn(),
    };
    jest.spyOn(rootInjector, 'get').mockReturnValue(mockInjector);
  });

  afterEach(() => {
    // Force clean state
    const emptyState: EntityState<LocationWithDepartments> = {
      ids: [],
      entities: {},
    };
    store.setState({ locations: emptyState });
    store.overrideSelector(selectLocationsDepartments, emptyState);
    store.refreshState();
    jest.clearAllMocks();
    store.resetSelectors();
    TestBed.resetTestingModule();
  });

  it('should return location when it exists in entities', () => {
    const mockLocation: LocationWithDepartments = {
      id: 'loc1',
      name: 'Location 1',
      departments: ['dept1', 'dept2'],
    };

    const mockState: EntityState<LocationWithDepartments> = {
      ids: ['loc1'],
      entities: { loc1: mockLocation },
    };

    currentLocationStoreMock.selectCurrentLocationId.mockReturnValue('loc1');
    store.overrideSelector(selectLocationsDepartments, mockState);
    store.refreshState();

    const result = selectCurrentLocationSignal();

    expect(result).toEqual(mockLocation);
    expect(currentLocationStoreMock.selectCurrentLocationId).toHaveBeenCalled();
  });

  it('should return default location when it does not exist in entities', () => {
    const expectedDefault: LocationWithDepartments = {
      id: '',
      name: '',
      departments: [],
    };

    const mockState: EntityState<LocationWithDepartments> = {
      ids: [],
      entities: {},
    };

    currentLocationStoreMock.selectCurrentLocationId.mockReturnValue(
      'nonexistent',
    );
    store.overrideSelector(selectLocationsDepartments, mockState);
    store.refreshState();

    const result = selectCurrentLocationSignal();

    expect(result).toEqual(expectedDefault);
    expect(currentLocationStoreMock.selectCurrentLocationId).toHaveBeenCalled();
  });
});
