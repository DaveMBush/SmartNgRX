import { EnvironmentInjector, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

// Define mock data first, before any mocks
const locationId1 = 'location1';
const locationId2 = 'location2';
const locationName1 = 'Location 1';

// Create mock entities that will be used everywhere
const mockLocation1 = {
  id: locationId1,
  name: locationName1,
  departments: ['dept1', 'dept2'],
};

const mockLocation2 = {
  id: locationId2,
  name: 'Location 2',
  departments: ['dept3', 'dept4'],
};

const mockEntities = {
  [locationId1]: mockLocation1,
  [locationId2]: mockLocation2,
};

// Create mock store instance
const mockStoreInstance = {
  selectCurrentLocationId: signal(locationId1),
};

// Now setup mocks with data already defined
jest.mock(
  '../locations/selectors/select-locations-departments.selectors',
  () => ({
    selectLocationsDepartments: jest.fn().mockReturnValue({
      entities: {
        [locationId1]: mockLocation1,
        [locationId2]: mockLocation2,
      },
      ids: [locationId1, locationId2],
    }),
  }),
);

jest.mock('@smarttools/smart-ngrx', () => {
  // Use a function to avoid hoisting issues
  const createMockRootInjector = (): {
    set: jest.Mock;
    get: jest.Mock;
  } => ({
    set: jest.fn(),
    get: jest.fn().mockReturnValue({
      get: jest.fn().mockImplementation((token) => {
        // We have to use requireMock because the actual import hasn't happened yet
        // The any cast is necessary because we can't import the real type here
        const store = (
          jest.requireMock('./current-location.signal-store') as unknown as {
            currentLocationSignalStore: typeof currentLocationSignalStore;
          }
        ).currentLocationSignalStore;
        if (token === store) {
          return mockStoreInstance;
        }
        return null;
      }),
    }),
  });

  return {
    rootInjector: createMockRootInjector(),
    createSmartSignal: jest.fn().mockImplementation(() => {
      return jest.fn().mockReturnValue({
        entities: mockEntities,
        ids: [locationId1, locationId2],
      });
    }),
  };
});

// Import from smart-signals
import { rootInjector } from '@smarttools/smart-signals';

import { selectLocationsDepartments } from '../locations/selectors/select-locations-departments.selectors';
// Import the files under test
import { currentLocationSignalStore } from './current-location.signal-store';
import { selectCurrentLocationSignal } from './select-current-location.signal';

describe('selectCurrentLocationSignal', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: currentLocationSignalStore,
          useValue: mockStoreInstance,
        },
        {
          provide: EnvironmentInjector,
          useValue: {
            get: jest.fn().mockImplementation((token) => {
              if (token === currentLocationSignalStore) {
                return mockStoreInstance;
              }
              return null;
            }),
          },
        },
      ],
    });

    // Set the TestBed injector as the root injector
    const testInjector = TestBed.inject(EnvironmentInjector);
    rootInjector.set(testInjector);
  });

  it('should return the correct location when location ID exists', () => {
    // Set the current location ID
    mockStoreInstance.selectCurrentLocationId.set(locationId1);

    // Create the signal
    const locationSignal = selectCurrentLocationSignal(
      mockStoreInstance as unknown as InstanceType<
        typeof currentLocationSignalStore
      >,
    );

    // Get the value
    const result = locationSignal();

    // Verify the correct location was returned
    expect(result).toEqual({
      id: locationId1,
      name: locationName1,
      departments: ['dept1', 'dept2'],
    });
  });

  it('should return the correct location when changing location ID', () => {
    // Set initial location ID
    mockStoreInstance.selectCurrentLocationId.set(locationId1);

    // Create the signal
    const locationSignal = selectCurrentLocationSignal(
      mockStoreInstance as unknown as InstanceType<
        typeof currentLocationSignalStore
      >,
    );

    // Initial result
    expect(locationSignal()).toEqual(mockLocation1);

    // Change location ID
    mockStoreInstance.selectCurrentLocationId.set(locationId2);

    // Verify updated result
    expect(locationSignal()).toEqual(mockLocation2);
  });

  it('should return empty object when location ID does not exist', () => {
    // Set the current location ID to a non-existent one
    mockStoreInstance.selectCurrentLocationId.set('nonexistent');

    // Create the signal
    const locationSignal = selectCurrentLocationSignal(
      mockStoreInstance as unknown as InstanceType<
        typeof currentLocationSignalStore
      >,
    );

    // Get the value
    const result = locationSignal();

    // Verify default empty object was returned
    expect(result).toEqual({
      id: '',
      name: '',
      departments: [],
    });
  });

  it('should handle empty/undefined location state', () => {
    // Temporarily override the mock to return empty entities
    jest.mocked(selectLocationsDepartments).mockReturnValueOnce({
      entities: {},
      ids: [],
    });

    mockStoreInstance.selectCurrentLocationId.set(locationId1);

    // Create the signal
    const locationSignal = selectCurrentLocationSignal(
      mockStoreInstance as unknown as InstanceType<
        typeof currentLocationSignalStore
      >,
    );

    // Get the value
    const result = locationSignal();

    // Verify default empty object was returned
    expect(result).toEqual({
      id: '',
      name: '',
      departments: [],
    });
  });
});
