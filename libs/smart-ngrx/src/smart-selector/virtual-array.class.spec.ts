import { VirtualArrayContents } from '@smarttools/core';

import { FacadeBase } from '../../../smart-core/src/facades/facade.base';
import { VirtualArray } from './virtual-array.class';

interface TestableVirtualArray<P extends object>
  extends Omit<VirtualArray<P>, 'dispatchLoadByIndexes'> {
  dispatchLoadByIndexes(
    parentId: string,
    childField: string,
    index: number,
  ): void;
}

describe('VirtualArray', () => {
  let virtualArray: TestableVirtualArray<object>;
  let mockActionService: jest.Mocked<FacadeBase>;
  let mockVirtualArrayContents: VirtualArrayContents;
  const parentId = 'parent123';
  const childField = 'children';
  beforeEach(() => {
    mockActionService = {
      loadByIndexes: jest.fn(),
    } as unknown as jest.Mocked<FacadeBase>;

    mockVirtualArrayContents = {
      indexes: ['id1', 'id2', 'id3'],
      length: 5,
    };

    virtualArray = new VirtualArray<object>(
      mockVirtualArrayContents,
      mockActionService,
      parentId,
      childField,
    ) as unknown as TestableVirtualArray<object>;
  });

  describe('constructor', () => {
    it('should initialize with correct properties', () => {
      expect(virtualArray.rawArray).toEqual(['id1', 'id2', 'id3']);
      expect(virtualArray.length).toBe(5);
    });
  });

  describe('proxy get handler', () => {
    it('should return existing id for known index', () => {
      expect(virtualArray[0]).toBe('id1');
    });

    it('should dispatch load action and return placeholder for unknown index', () => {
      const result = virtualArray[3];
      expect(result).toBe('index-3');

      // eslint-disable-next-line @typescript-eslint/unbound-method -- needed for unit testing
      expect(mockActionService.loadByIndexes).toHaveBeenCalledWith(
        parentId,
        childField,
        3,
      );
    });

    it('should return property value for non-numeric properties', () => {
      expect(virtualArray.length).toBe(5);
    });

    it('should create a new array when rawArray is frozen', () => {
      // Freeze the rawArray
      Object.freeze(virtualArray.rawArray);

      // Access an unknown index to trigger the proxy handler
      const result = virtualArray[4];
      // Check if a new array was created
      expect(Object.isFrozen(virtualArray.rawArray)).toBe(false);
      expect(result).toEqual('index-4');
    });
  });

  describe('refetchIndexes', () => {
    it('should reset fetchedIndexes', () => {
      virtualArray.fetchedIndexes = [true, true, false];
      virtualArray.refetchIndexes();
      expect(virtualArray.fetchedIndexes).toEqual([]);
    });
  });

  describe('getIdAtIndex', () => {
    it('should return existing id for known index', () => {
      expect(virtualArray.getIdAtIndex(1)).toBe('id2');
    });

    it('should return placeholder id for unknown index within bounds', () => {
      expect(virtualArray.getIdAtIndex(3)).toBe('index-3');
    });

    it('should return undefined for out of bounds index', () => {
      expect(virtualArray.getIdAtIndex(5)).toBeUndefined();
      expect(virtualArray.getIdAtIndex(-1)).toBeUndefined();
    });
  });

  describe('dispatchLoadByIndexes', () => {
    it('should create a new fetchedIndexes array when it is frozen', () => {
      // Freeze the fetchedIndexes array
      virtualArray.fetchedIndexes = Object.freeze([
        false,
        false,
        false,
      ]) as unknown as boolean[];

      // Call dispatchLoadByIndexes
      virtualArray.dispatchLoadByIndexes(parentId, childField, 1);

      // Check if a new array was created and the correct index was set
      expect(Object.isFrozen(virtualArray.fetchedIndexes)).toBe(false);
      expect(virtualArray.fetchedIndexes).toEqual([false, true, false]);
    });

    it('should update existing fetchedIndexes array when it is not frozen', () => {
      virtualArray.fetchedIndexes = [false, false, false];

      virtualArray.dispatchLoadByIndexes(parentId, childField, 1);

      expect(virtualArray.fetchedIndexes).toEqual([false, true, false]);
    });

    it('should call loadByIndexes on the action service', () => {
      virtualArray.dispatchLoadByIndexes(parentId, childField, 1);

      // eslint-disable-next-line @typescript-eslint/unbound-method -- needed for unit testing
      expect(mockActionService.loadByIndexes).toHaveBeenCalledWith(
        parentId,
        childField,
        1,
      );
    });
  });
});
