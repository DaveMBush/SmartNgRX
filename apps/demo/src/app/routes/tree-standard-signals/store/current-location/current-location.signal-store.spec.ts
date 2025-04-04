import { TestBed } from '@angular/core/testing';

// Create a simplified Location interface for testing
interface Location {
  id: string;
  name: string;
  departments: unknown[];
}

// Mock data - create before the mock
const mockLocations: Location[] = [];

// Create mock signal function that we'll use across tests
const mockSignalFn = jest.fn().mockReturnValue(mockLocations);

// Create a mock for selectLocations that we can spy on
const mockSelectLocations = jest.fn().mockReturnValue(mockSignalFn);

// Mock the module before importing
jest.mock('../locations/selectors/select-locations.selector', () => ({
  selectLocations: mockSelectLocations,
}));

// Now import the module under test
import { currentLocationSignalStore } from './current-location.signal-store';

describe('currentLocationSignalStore', () => {
  let store: InstanceType<typeof currentLocationSignalStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [currentLocationSignalStore],
    });

    // Reset test data
    mockLocations.length = 0;

    // Clear all mock calls and implementations
    jest.clearAllMocks();
    mockSignalFn.mockClear();
    mockSelectLocations.mockClear();

    // Ensure the mock function returns our signal function
    mockSelectLocations.mockReturnValue(mockSignalFn);

    // Get a fresh instance of the store
    store = TestBed.inject(currentLocationSignalStore);
  });

  describe('setCurrentLocationId', () => {
    it('should update the currentLocationId state', () => {
      // Initial value should be empty
      expect(store.currentLocationId()).toBe('');

      // Set a new location ID
      store.setCurrentLocationId('location1');

      // State should be updated
      expect(store.currentLocationId()).toBe('location1');
    });
  });

  describe('selectCurrentLocationId', () => {
    it('should return the currentLocationId when it has a value', () => {
      // Set up test data
      mockLocations.push(
        { id: 'location2', name: 'Location 2', departments: [] },
        { id: 'location3', name: 'Location 3', departments: [] },
      );

      // Set a location ID
      store.setCurrentLocationId('location1');

      // Should prioritize the current location ID
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('location1');

      // Verify locations were retrieved
      expect(mockSelectLocations).toHaveBeenCalled();
    });

    it('should return the first location ID when currentLocationId is empty and locations exist', () => {
      // Set up test data with valid objects
      mockLocations.push(
        { id: 'location1', name: 'Location 1', departments: [] },
        { id: 'location2', name: 'Location 2', departments: [] },
      );

      // Make sure current ID is empty
      store.setCurrentLocationId('');

      // Get the computed signal value
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('location1');

      // Verify locations were retrieved
      expect(mockSelectLocations).toHaveBeenCalled();
    });

    it('should return empty string when currentLocationId is empty and locations are empty', () => {
      // Empty locations array (default state)

      // Make sure current ID is empty
      store.setCurrentLocationId('');

      // Get the computed signal value
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('');

      // Verify locations were retrieved
      expect(mockSelectLocations).toHaveBeenCalled();
    });

    it('should return empty string when currentLocationId is empty and locations are not objects', () => {
      // Set up non-object locations
      const nonObjects = ['not an object', 'also not an object'];
      // Replace mockLocations.push with direct assignment
      mockSignalFn.mockReturnValue(nonObjects);

      // Make sure current ID is empty
      store.setCurrentLocationId('');

      // Get the computed signal value
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('');

      // Verify locations were retrieved
      expect(mockSelectLocations).toHaveBeenCalled();
    });

    it('should handle undefined locations array', () => {
      // Set mockSignalFn to return undefined
      mockSignalFn.mockReturnValue(undefined);

      // Make sure current ID is empty
      store.setCurrentLocationId('');

      // Get the computed signal value - should not throw due to null check in implementation
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('');

      // Verify locations were retrieved
      expect(mockSelectLocations).toHaveBeenCalled();
    });
  });
});
