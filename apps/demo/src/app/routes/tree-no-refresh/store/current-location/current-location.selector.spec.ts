import {
  TreeNoRefreshState,
  TreeNoRefreshState2,
} from '../tree-no-refresh-state.interface';
import { selectCurrentLocationId } from './current-location.selector';

describe('selectCurrentLocationId', () => {
  let mockState: TreeNoRefreshState;
  beforeEach(() => {
    mockState = {
      locations: {
        ids: ['1', '2'],
        entities: {
          '1': { id: '1', name: 'Location 1', departments: [] },
          '2': { id: '2', name: 'Location 2', departments: [] },
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
  });

  it('should return state.currentLocation if available', () => {
    const mockState2: TreeNoRefreshState2 = {
      currentLocation: '1',
    };
    const result = selectCurrentLocationId.projector(mockState, mockState2);
    expect(result).toBe('1');
  });
  it('should return the first location ID if currentLocation is not available', () => {
    const mockState2: TreeNoRefreshState2 = {
      currentLocation: '',
    };
    const result = selectCurrentLocationId.projector(mockState, mockState2);
    expect(result).toBe('1');
  });
  it('should return an empty string if both currentLocation and locations.ids are not available', () => {
    mockState.locations = {
      ids: [],
      entities: {},
    };
    const mockState2: TreeNoRefreshState2 = {
      currentLocation: '',
    };
    const result = selectCurrentLocationId.projector(mockState, mockState2);
    expect(result).toBe('');
  });
});
