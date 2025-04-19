import { TestBed } from '@angular/core/testing';

import { Location } from '../../../../../shared/locations/location.interface';
import { selectLocations } from './select-locations.selector';

// Mock the entire module and its functions
jest.mock('../../top/select-top-locations.selectors', () => {
  return {
    selectTopLocations: jest.fn(),
  };
});

// Import after mocking
import { selectTopLocations } from '../../top/select-top-locations.selectors';

// Constants for reused values
const location1Id = 'loc1';
const location1Name = 'Location 1';
const location2Id = 'loc2';
const location2Name = 'Location 2';

// Create location objects that match the expected type
const mockLocationObjects: Location[] = [
  { id: location1Id, name: location1Name, departments: [] },
  { id: location2Id, name: location2Name, departments: [] },
];

// Mock implementation helper that ensures the computed function is called
function setupMockSelector(returnValue: unknown): void {
  (selectTopLocations as unknown as jest.Mock).mockReturnValue(returnValue);
}

describe('selectLocations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    jest.clearAllMocks();
  });

  it('should return location objects when conditions are met', () => {
    // Set up mock for success case
    setupMockSelector({
      ids: ['top1'],
      entities: {
        top1: {
          id: 'top1',
          locations: mockLocationObjects,
        },
      },
    });

    // Get signal and value
    const locationsSignal = selectLocations();
    const result = locationsSignal();

    // Verify results
    expect(result).toEqual(mockLocationObjects);
  });

  it('should handle multiple IDs', () => {
    // Set up mock for multiple IDs
    setupMockSelector({
      ids: ['top1', 'top2'],
      entities: {
        top1: { id: 'top1', locations: mockLocationObjects },
        top2: { id: 'top2', locations: mockLocationObjects },
      },
    });

    // Get signal and value
    const locationsSignal = selectLocations();
    const result = locationsSignal();

    // Verify results
    expect(result).toEqual([]);
  });

  it('should handle missing entity', () => {
    // Set up mock for missing entity
    setupMockSelector({
      ids: ['nonExistentId'],
      entities: {},
    });

    // Get signal and value
    const locationsSignal = selectLocations();
    const result = locationsSignal();

    // Verify results
    expect(result).toEqual([]);
  });

  it('should handle empty locations', () => {
    // Set up mock for empty locations
    setupMockSelector({
      ids: ['top1'],
      entities: {
        top1: {
          id: 'top1',
          locations: [],
        },
      },
    });

    // Get signal and value
    const locationsSignal = selectLocations();
    const result = locationsSignal();

    // Verify results
    expect(result).toEqual([]);
  });

  it('should handle non-object locations', () => {
    // Set up mock for string locations
    setupMockSelector({
      ids: ['top1'],
      entities: {
        top1: {
          id: 'top1',
          locations: ['not an object', 'not an object'],
        },
      },
    });

    // Get signal and value
    const locationsSignal = selectLocations();
    const result = locationsSignal();

    // Verify results
    expect(result).toEqual([]);
  });
});
