import { SharedState } from '../shared-state.interface';
import { selectCurrentLocationId } from './current-location.selector';

describe('selectCurrentLocationId', () => {
  it('should return state.currentLocation if available', () => {
    const mockState: SharedState = {
      currentLocation: '1',
      locations: {
        ids: ['1', '2'],
        entities: {
          '1': { id: '1', name: 'Location 1', children: [] },
          '2': { id: '2', name: 'Location 2', children: [] },
        },
      },
      departments: {
        ids: [],
        entities: {},
      },
      departmentChildren: {
        ids: [],
        entities: {},
      },
    };
    const result = selectCurrentLocationId.projector(mockState);
    expect(result).toBe('1');
  });
  it('should return the first location ID if currentLocation is not available', () => {
    const mockState: SharedState = {
      currentLocation: '',
      locations: {
        ids: ['1', '2'],
        entities: {
          '1': { id: '1', name: 'Location 1', children: [] },
          '2': { id: '2', name: 'Location 2', children: [] },
        },
      },
      departments: {
        ids: [],
        entities: {},
      },
      departmentChildren: {
        ids: [],
        entities: {},
      },
    };
    const result = selectCurrentLocationId.projector(mockState);
    expect(result).toBe('1');
  });
  it('should return an empty string if both currentLocation and locations.ids are not available', () => {
    const mockState: SharedState = {
      currentLocation: '',
      locations: {
        ids: [],
        entities: {},
      },
      departments: {
        ids: [],
        entities: {},
      },
      departmentChildren: {
        ids: [],
        entities: {},
      },
    };
    const result = selectCurrentLocationId.projector(mockState);
    expect(result).toBe('');
  });
});
