import { TestBed } from '@angular/core/testing';

// Create a simplified Location interface for testing
interface Location {
  id: string;
  name: string;
  departments: unknown[];
}

// Create actual concrete instances for our locations
const locationsList: Location[] = [];

// Create mock selectLocations function
const mockSelectLocations = jest.fn(() => {
  return locationsList;
});

// Mock the module before importing
jest.mock('../locations/selectors/select-locations.selectors', () => ({
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
    locationsList.length = 0;

    // Clear all mock calls and implementations
    jest.clearAllMocks();
    mockSelectLocations.mockClear();

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
      locationsList.push(
        { id: 'location2', name: 'Location 2', departments: [] },
        { id: 'location3', name: 'Location 3', departments: [] },
      );

      // Set a location ID
      store.setCurrentLocationId('location1');

      // Should prioritize the current location ID
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('location1');
    });

    it('should return the first location ID when currentLocationId is empty and locations exist', () => {
      // Set up test data with valid objects
      locationsList.push(
        { id: 'location1', name: 'Location 1', departments: [] },
        { id: 'location2', name: 'Location 2', departments: [] },
      );

      // Make sure current ID is empty
      store.setCurrentLocationId('');

      // Get the computed signal value
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('location1');
    });

    it('should return empty string when currentLocationId is empty and locations are empty', () => {
      // Empty locations array (default state)

      // Make sure current ID is empty
      store.setCurrentLocationId('');

      // Get the computed signal value
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('');
    });

    it('should return empty string when currentLocationId is empty and locations are not objects', () => {
      // Replace locationsList with non-objects
      mockSelectLocations.mockReturnValueOnce([
        'not an object',
        'also not an object',
      ] as unknown as Location[]);

      // Make sure current ID is empty
      store.setCurrentLocationId('');

      // Get the computed signal value
      const result = store.selectCurrentLocationId();

      // Verify results
      expect(result).toBe('');
    });
  });
});
