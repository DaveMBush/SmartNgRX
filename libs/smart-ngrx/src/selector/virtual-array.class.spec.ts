import { ActionGroup } from '../actions/action-group.interface';
import { castTo } from '../common/cast-to.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { store } from './store.function';
import { VirtualArray } from './virtual-array.class';

jest.mock('./store.function');

describe('VirtualArray', () => {
  let virtualArray: VirtualArray<SmartNgRXRowBase>;
  let mockDispatch: jest.Mock;
  let mockStore: { dispatch: jest.Mock };

  const mockActionGroup = castTo<ActionGroup>({
    loadByIndexes: jest.fn(),
  });

  beforeEach(() => {
    const mockArrayContents: VirtualArrayContents = {
      indexes: ['1', '2', '3'],
      length: 3,
    };
    mockDispatch = jest.fn();
    mockStore = { dispatch: mockDispatch };
    (store as jest.Mock).mockReturnValue(mockStore);

    virtualArray = new VirtualArray(
      mockArrayContents,
      mockActionGroup,
      'parentId',
      'childField',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the value at the index if the prop is a string that is a number and the index exists in rawArray', () => {
    expect(virtualArray[0]).toBe('1');
    expect(virtualArray[1]).toBe('2');
    expect(virtualArray[2]).toBe('3');
    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });

  describe('and when the virtual array is frozen', () => {
    beforeEach(() => {
      Object.freeze(virtualArray.rawArray);
    });

    it('should dispatch loadByIndexes action if the prop is a string that is a number and the index does not exist in rawArray', () => {
      expect(virtualArray[3]).toBe('index-3');
      expect(virtualArray.rawArray[3]).toBe('indexNoOp-3');
      expect(mockDispatch).toHaveBeenCalledWith(
        mockActionGroup.loadByIndexes({
          indexes: [3],
          parentId: 'parentId',
          childField: 'childField',
        }),
      );
    });
  });

  it('should dispatch loadByIndexes action if the prop is a string that is a number and the index does not exist in rawArray', () => {
    expect(virtualArray[3]).toBe('index-3');
    expect(mockDispatch).toHaveBeenCalledWith(
      mockActionGroup.loadByIndexes({
        indexes: [3],
        parentId: 'parentId',
        childField: 'childField',
      }),
    );
  });

  it('should return the value of the property if the prop is anything other than a string that is a number', () => {
    expect(virtualArray.length).toBe(3);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  describe('dispatchLoadByIndexes', () => {
    it('should not dispatch action if the index has already been fetched', () => {
      let index0 = virtualArray[0]; // Access index 0 to mark it as fetched
      index0 = virtualArray[0]; // Access index 0 again

      expect(index0).toBe('1');
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch action if the index has not been fetched', () => {
      const index0 = virtualArray[0]; // Access index 0
      const index1 = virtualArray[1]; // Access index 1

      expect(index0).toBe('1');
      expect(index1).toBe('2');
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should create a new fetchedIndexes array if it is frozen', () => {
      const index0 = virtualArray[0]; // Access index 0
      Object.freeze(virtualArray.fetchedIndexes);
      const index1 = virtualArray[1]; // Access index 1

      expect(index0).toBe('1');
      expect(index1).toBe('2');
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(Object.isFrozen(virtualArray.fetchedIndexes)).toBe(false);
    });

    it('should dispatch loadByIndexes action with correct parameters', () => {
      const index1 = virtualArray[1]; // Access index 1

      expect(index1).toBe('2');
      expect(mockDispatch).toHaveBeenCalledWith(
        mockActionGroup.loadByIndexes({
          indexes: [1],
          parentId: 'parentId',
          childField: 'childField',
        }),
      );
    });
  });

  describe('array access behavior', () => {
    it('should return existing value for indexes in rawArray', () => {
      expect(virtualArray[0]).toBe('1');
      expect(virtualArray[1]).toBe('2');
      expect(virtualArray[2]).toBe('3');
    });

    it('should return placeholder value for non-existing indexes', () => {
      expect(virtualArray[3]).toBe('index-3');
      expect(virtualArray[4]).toBe('index-4');
    });

    it('should create a new rawArray if it is frozen', () => {
      Object.freeze(virtualArray.rawArray);
      const index3 = virtualArray[3]; // Access non-existing index
      expect(index3).toBe('index-3');
      expect(Object.isFrozen(virtualArray.rawArray)).toBe(false);
      expect(virtualArray.rawArray[3]).toBe('indexNoOp-3');
    });
  });

  describe('refetchIndexes', () => {
    it('should reset fetchedIndexes to an empty array', () => {
      const index0 = virtualArray[0]; // Access index 0 to mark it as fetched
      const index1 = virtualArray[1]; // Access index 1 to mark it as fetched
      expect(index0).toBe('1');
      expect(index1).toBe('2');
      expect(virtualArray.fetchedIndexes).toEqual([true, true]);

      virtualArray.refetchIndexes();

      expect(virtualArray.fetchedIndexes).toEqual([]);
    });

    it('should cause indexes to be refetched after calling refetchIndexes', () => {
      const index0 = virtualArray[0]; // Access index 0 to mark it as fetched
      expect(index0).toBe('1');
      expect(mockDispatch).toHaveBeenCalledTimes(1);

      virtualArray.refetchIndexes();
      const index0Again = virtualArray[0]; // Access index 0 again

      expect(index0Again).toBe('1');
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
  });
});
