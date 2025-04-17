/* eslint-disable @typescript-eslint/unbound-method -- needed for unit tests*/
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { FacadeBase } from '../facades/facade.base';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { BaseArrayProxy } from './base-array-proxy.class';

class ArrayProxy<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
> extends BaseArrayProxy<P, C> {
  override removeFromStore(row: C, parent: P): void {
    throw new Error('removeFromStore Method not implemented.');
  }
}

const originalName = 'Original Name';

// Mock the getArrayItem function
jest.mock('./get-array-item.function', () => ({
  getArrayItem: jest.fn().mockReturnValue({ id: '1', relatedIds: [] }),
}));

import { facadeRegistry } from '../registrations/facade-registry.class';
import { RowProxy } from '../row-proxy/row-proxy.class';
import { BaseChildDefinition } from '../types/base-child-definition.interface';
import { ParentInfo } from '../types/parent-info.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { getArrayItem } from './get-array-item.function';
import { VirtualArray } from './virtual-array.class';

//Mock the actionServiceRegistry and entityDefinitionRegistry

jest.mock('../registrations/entity-definition-registry.function', () => ({
  entityDefinitionRegistry: jest.fn().mockReturnValue({
    entityAdapter: createEntityAdapter<MockRow>(),
    selectId: (row: MockRow) => row.id,
    parentSelectId: (row: MockRow) => row.id,
  }),
}));

interface TestableArrayProxy<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
> extends Omit<
    ArrayProxy<P, C>,
    'createNewParentFromParent' | 'removeChildIdFromChildArray'
  > {
  removeChildIdFromChildArray(
    entity: EntityState<P>,
    parentId: string,
    parentField: keyof P,
    childId: string,
  ): void;
  createNewParentFromParent(parent: P, isEditing: boolean): P;
}

interface MockRow extends SmartNgRXRowBase {
  id: string;
  relatedIds: string[];
  name?: string;
}

class MockFacade<T extends SmartNgRXRowBase> extends FacadeBase<T> {
  override loadByIndexes(
    parentId: string,
    childField: string,
    index: number,
  ): void {
    throw new Error('loadByIndexesMethod not implemented.');
  }

  override loadByIndexesSuccess(
    parentId: string,
    childField: string,
    array: PartialArrayDefinition,
  ): void {
    throw new Error('loadByIndexesSuccess Method not implemented.');
  }

  override upsertRow(row: T): void {
    throw new Error('upsertRow Method not implemented.');
  }

  override removeFromParents(id: string): ParentInfo[] {
    throw new Error('removeFromParents Method not implemented.');
  }

  override init(): boolean {
    return true;
  }

  override markDirty(): void {
    return;
  }

  override markNotDirty(): void {
    return;
  }

  override forceDirty(): void {
    return;
  }

  override garbageCollect(): void {
    return;
  }

  override remove(): void {
    return;
  }

  override update(): void {
    return;
  }

  override updateMany(): void {
    return;
  }

  override loadByIds(): void {
    return;
  }

  override loadByIdsPreload(): void {
    return;
  }

  override loadByIdsSuccess(): void {
    return;
  }
}

describe('BaseArrayProxy', () => {
  let arrayProxy: TestableArrayProxy<MockRow, MockRow>;
  let mockChild: EntityState<MockRow>;
  let mockChildDefinition: BaseChildDefinition<MockRow>;
  let mockService: FacadeBase;

  beforeEach(() => {
    mockChild = {
      entities: {
        parentId: { id: 'parentId', relatedIds: ['childId'] }, // Ensure parentId exists
      },
      ids: ['parentId'],
    };
    mockChildDefinition = {
      childFeature: 'feature',
      childEntity: 'entity',
      parentFeature: 'parentFeature',
      parentEntity: 'parentEntity',
      parentField: 'relatedIds',
    } as BaseChildDefinition<MockRow>;
    mockService = {
      loadByIdsSuccess: jest.fn(),
    } as unknown as FacadeBase;
    jest.spyOn(facadeRegistry, 'register').mockReturnValue(mockService);

    arrayProxy = new ArrayProxy(
      [],
      mockChild,
      mockChildDefinition,
    ) as unknown as TestableArrayProxy<MockRow, MockRow>;
    arrayProxy.init(); // Call init to set up the entityAdapter and other dependencies
  });

  afterEach(() => {});

  describe('init', () => {
    it('should unfreeze the childArray if it is frozen', () => {
      // Arrange: Set up a frozen childArray
      const frozenArray = Object.freeze(['1', '2']) as string[];
      arrayProxy = new ArrayProxy(
        frozenArray,
        mockChild,
        mockChildDefinition,
      ) as unknown as TestableArrayProxy<MockRow, MockRow>;

      // Act: Call init
      arrayProxy.init();

      // Assert: Check that the array is no longer frozen
      expect(Object.isFrozen(arrayProxy.rawArray)).toBe(false);
    });

    it('should convert childArray to rawArray if it is an ArrayProxy', () => {
      // Arrange: Set up a childArray as an ArrayProxy
      const mockArrayProxy = new ArrayProxy(
        ['1', '2'],
        mockChild,
        mockChildDefinition,
      );
      arrayProxy = new ArrayProxy(
        mockArrayProxy,
        mockChild,
        mockChildDefinition,
      ) as unknown as TestableArrayProxy<MockRow, MockRow>;

      // Act: Call init
      arrayProxy.init();

      // Assert: Check that rawArray is set correctly
      expect(arrayProxy.rawArray).toEqual([]);
    });

    it('should handle VirtualArray type childArray correctly', () => {
      // Arrange: Set up a VirtualArray
      const virtualArray = {
        rawArray: ['1', '2', '3'],
        length: 3,
      } as unknown as VirtualArray<MockRow>;

      arrayProxy = new ArrayProxy(
        virtualArray as unknown as string[],
        mockChild,
        mockChildDefinition,
      ) as unknown as TestableArrayProxy<MockRow, MockRow>;

      // Act: Call init
      arrayProxy.init();

      // Assert: Check that rawArray and length are set correctly
      expect(arrayProxy.rawArray).toBe(virtualArray);
      expect(arrayProxy.length).toBe(3);
      expect(
        (arrayProxy as unknown as { childArray: string[] }).childArray,
      ).toEqual([]);
    });

    it('should handle actual VirtualArray instance correctly', () => {
      // Arrange: Create a real VirtualArray instance
      const virtualArray = new VirtualArray<MockRow>(
        { indexes: ['1', '2', '3'], length: 3 },
        mockService as unknown as FacadeBase,
        'parentId',
        'childField',
      );

      arrayProxy = new ArrayProxy(
        virtualArray as unknown as string[],
        mockChild,
        mockChildDefinition,
      ) as unknown as TestableArrayProxy<MockRow, MockRow>;

      // Act: Call init
      arrayProxy.init();

      // Assert: Check that rawArray and length are set correctly
      expect(arrayProxy.rawArray).toBe(virtualArray);
      expect(arrayProxy.length).toBe(3);
      expect(
        (arrayProxy as unknown as { childArray: string[] }).childArray,
      ).toEqual([]);
    });

    it('should unfreeze non-Array type childArray if frozen', () => {
      // Arrange: Set up a frozen non-Array object
      const frozenObject = Object.freeze({
        0: '1',
        1: '2',
        length: 2,
      }) as unknown as string[];

      arrayProxy = new ArrayProxy(
        frozenObject,
        mockChild,
        mockChildDefinition,
      ) as unknown as TestableArrayProxy<MockRow, MockRow>;

      // Act: Call init
      arrayProxy.init();

      // Assert: Check that the object is no longer frozen
      expect(Object.isFrozen(arrayProxy.rawArray)).toBe(false);
      expect(arrayProxy.rawArray).toEqual({ 0: '1', 1: '2', length: 2 });
    });
  });
  describe('getIdAtIndex', () => {
    it('should return the ID from the rawArray if index is valid', () => {
      // Arrange: Set up the rawArray with valid IDs
      arrayProxy.rawArray = ['1', '2', '3'];

      // Act: Call getIdAtIndex with a valid index
      const result = arrayProxy.getIdAtIndex(1);

      // Assert: Check that the correct ID is returned
      expect(result).toBe('2');
    });

    it('should return undefined if index is out of bounds', () => {
      // Arrange: Set up the rawArray with valid IDs
      arrayProxy.rawArray = ['1', '2', '3'];

      // Act & Assert: Call getIdAtIndex with an invalid index and expect an error
      expect(arrayProxy.getIdAtIndex(3)).toBeUndefined();
    });
  });
  describe('addToStore', () => {
    let mockParentService: MockFacade<SmartNgRXRowBase>;

    beforeEach(() => {
      mockService = {
        add: jest.fn(),
        loadByIdsSuccess: jest.fn(),
      } as unknown as MockFacade<SmartNgRXRowBase>;

      mockParentService = {
        update: jest.fn(),
        loadByIdsSuccess: jest.fn(),
      } as unknown as MockFacade<SmartNgRXRowBase>;

      jest.spyOn(arrayProxy, 'getServices').mockReturnValue({
        service: mockService as unknown as FacadeBase<MockRow>,
        parentService: mockParentService as unknown as FacadeBase<MockRow>,
      });
    });

    it('should add a new row to the store and update the parent when rawArray is a regular array', () => {
      // Arrange: Set up a regular array
      arrayProxy.rawArray = ['existingChildId'];
      const newRow = { id: 'newChildId', relatedIds: [] };
      const parent = { id: 'parentId', relatedIds: ['existingChildId'] };

      // Act: Call addToStore
      arrayProxy.addToStore(newRow, parent);

      // Assert: Check that the add method is called and parent is updated
      expect(mockService.loadByIdsSuccess).toHaveBeenCalledWith([newRow]);
      expect(mockParentService.loadByIdsSuccess).toHaveBeenCalledWith([
        expect.objectContaining({
          id: 'parentId',
          isEditing: true,
          relatedIds: ['existingChildId', 'newChildId'],
        }),
      ]);
    });

    it('should add a new row to the store and update the parent when rawArray is a VirtualArray', () => {
      // Arrange: Set up a VirtualArray
      const virtualArray = {
        rawArray: ['existingChildId'],
        length: 1,
      } as unknown as VirtualArray<MockRow>;
      arrayProxy.rawArray = virtualArray as unknown as string[];
      const newRow = { id: 'newChildId', relatedIds: [] };
      const parent = { id: 'parentId', relatedIds: ['existingChildId'] };

      // Act: Call addToStore
      arrayProxy.addToStore(newRow, parent);

      // Assert: Check that the add method is called and parent is updated
      expect(mockService.loadByIdsSuccess).toHaveBeenCalledWith([newRow]);
      expect(mockParentService.loadByIdsSuccess).toHaveBeenCalledWith([
        expect.objectContaining({
          id: 'parentId',
          isEditing: true,
          relatedIds: {
            indexes: ['existingChildId', 'newChildId'],
            length: 2,
          },
        }),
      ]);
    });
  });
  describe('getAtIndex', () => {
    it('should return the item from the store if index is valid', () => {
      arrayProxy.rawArray = ['1'];
      const result = arrayProxy.getAtIndex(0);

      expect(getArrayItem).toHaveBeenCalledWith(
        mockChild,
        '1',
        mockChildDefinition,
      );
      expect(result).toEqual({ id: '1', relatedIds: [] });
    });

    it('should throw an error if index is out of bounds', () => {
      arrayProxy.rawArray = ['1'];
      expect(() => arrayProxy.getAtIndex(1)).toThrow('Index out of bounds');
    });
  });

  describe('removeChildIdFromChildArray', () => {
    beforeEach(() => {
      jest.spyOn(arrayProxy, 'getServices').mockReturnValue({
        parentService: mockService as unknown as FacadeBase<MockRow>,
        service: mockService as unknown as FacadeBase<MockRow>,
      });
    });
    it('should remove childId from parent array', () => {
      const parentId = 'parentId';
      const childId = 'childId';
      const parentField = 'relatedIds';

      arrayProxy.removeChildIdFromChildArray(
        mockChild,
        parentId,
        parentField,
        childId,
      );

      expect(mockService.loadByIdsSuccess).toHaveBeenCalledWith([
        expect.objectContaining({
          id: parentId,
          relatedIds: [],
        }),
      ]);
    });

    it('should remove childId from parent VirtualArrayContents', () => {
      mockChild.entities['parentId']!.relatedIds = {
        indexes: ['childId'],
        length: 1,
      } as unknown as string[];

      const parentId = 'parentId';
      const childId = 'childId';
      const parentField = 'relatedIds';

      arrayProxy.removeChildIdFromChildArray(
        mockChild,
        parentId,
        parentField,
        childId,
      );

      expect(mockService.loadByIdsSuccess).toHaveBeenCalledWith([
        expect.objectContaining({
          id: parentId,
          relatedIds: {
            indexes: ['delete'],
            length: 0,
          },
        }),
      ]);
    });
    it('should not update the parent if childId is not in the parent array', () => {
      const parentId = 'parentId';
      const childId = 'nonExistentChildId'; // Child ID not present
      const parentField = 'relatedIds';

      arrayProxy.removeChildIdFromChildArray(
        mockChild,
        parentId,
        parentField,
        childId,
      );

      // Assert: Ensure loadByIdsSuccess is not called
      expect(mockService.loadByIdsSuccess).not.toHaveBeenCalled();
    });

    it('should not update the parent if childId is not in the parent VirtualArrayContents', () => {
      mockChild.entities['parentId']!.relatedIds = {
        indexes: ['childId'],
        length: 1,
      } as unknown as string[];

      const parentId = 'parentId';
      const childId = 'nonExistentChildId'; // Child ID not present
      const parentField = 'relatedIds';

      arrayProxy.removeChildIdFromChildArray(
        mockChild,
        parentId,
        parentField,
        childId,
      );

      // Assert: Ensure loadByIdsSuccess is not called
      expect(mockService.loadByIdsSuccess).not.toHaveBeenCalled();
    });
  });
  describe('createNewParentFromParent', () => {
    it('should create a new parent with RowProxy changes when parent is a RowProxy', () => {
      // Arrange
      const mockRowProxy = {
        getRealRow: jest
          .fn()
          .mockReturnValue({ id: 'parentId', name: originalName }),
        changes: { name: 'Updated Name' },
      } as unknown as RowProxy<MockRow>;

      // Act
      const result = arrayProxy.createNewParentFromParent(
        mockRowProxy as unknown as MockRow,
        true,
      );

      // Assert
      expect(result).toEqual({
        id: 'parentId',
        name: 'Updated Name',
        isEditing: true,
      });
      expect(mockRowProxy.getRealRow).toHaveBeenCalled();
    });

    it('should create a new parent without RowProxy changes when parent is not a RowProxy', () => {
      // Arrange
      const parent = { id: 'parentId', name: originalName } as MockRow;

      // Act
      const result = arrayProxy.createNewParentFromParent(parent, false);

      // Assert
      expect(result).toEqual({
        id: 'parentId',
        name: originalName,
        isEditing: false,
      });
    });
  });
});
