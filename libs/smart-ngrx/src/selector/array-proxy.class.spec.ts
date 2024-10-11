import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { actionFactory } from '../actions/action.factory';
import { ActionService } from '../actions/action.service';
import { ActionGroup } from '../actions/action-group.interface';
import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import * as actionServiceRegistry from '../registrations/action.service.registry';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import {
  registerEntity,
  unregisterEntity,
} from '../registrations/register-entity.function';
import { RowProxy } from '../row-proxy/row-proxy.class';
import { createStore } from '../tests/functions/create-store.function';
import { setState } from '../tests/functions/set-state.function';
import { ChildDefinition } from '../types/child-definition.interface';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ArrayProxy } from './array-proxy.class';
import * as getArrayItem from './get-array-item.function';
import { VirtualArray } from './virtual-array.class';

const childDefinition = {
  childFeature: 'feature',
  childEntity: 'entity',
  parentField: 'children',
  parentFeature: 'parentFeature',
  parentEntity: 'parentEntity',
} as unknown as ChildDefinition;

interface Row {
  id: string;
  children: string[];
  isEditing: boolean;
}

interface RowWithVirtualChildren {
  id: string;
  children: {
    indexes: string[];
    length: number;
  };
  isEditing: boolean;
}

interface PublicRemoveChildIdFromChildArray {
  removeChildIdFromChildArray(
    entity: EntityState<Row> | EntityState<RowWithVirtualChildren>,
    parentId: string,
    parentField: keyof Row | keyof RowWithVirtualChildren,
    childId: string,
  ): void;
}

type PublicArrayProxy = Omit<ArrayProxy, 'removeChildIdFromChildArray'> &
  PublicRemoveChildIdFromChildArray;

describe('ArrayProxy', () => {
  let arrayProxy: ArrayProxy | PublicArrayProxy | undefined;
  let originalArray: string[] = [];
  let getArrayItemSpy: jest.SpyInstance;
  function assertArrayProxy(ap: boolean): asserts ap {
    assert(ap, 'arrayProxy is undefined');
  }
  beforeEach(() => {
    registerEntity(childDefinition.childFeature, childDefinition.childEntity, {
      markAndDeleteInit: {},
    } as EntityAttributes);

    getArrayItemSpy = jest
      .spyOn(getArrayItem, 'getArrayItem')
      .mockImplementation(() => ({
        id: '1',
        delete: jest.fn(),
      }));
    createStore();
    // make sure the feature exists
    setState(childDefinition.childFeature, childDefinition.childEntity, {
      ids: [],
      entities: {},
    });
    entityDefinitionCache(
      childDefinition.childFeature,
      childDefinition.childEntity,
      {
        entityAdapter: createEntityAdapter<SmartNgRXRowBase>(),
      } as SmartEntityDefinition<SmartNgRXRowBase>,
    );
    entityDefinitionCache(
      childDefinition.parentFeature,
      childDefinition.parentEntity,
      {
        entityAdapter: createEntityAdapter<SmartNgRXRowBase>(),
      } as SmartEntityDefinition<SmartNgRXRowBase>,
    );
  });
  afterEach(() => {
    unregisterEntity(childDefinition.childFeature, childDefinition.childEntity);

    arrayProxy = undefined;
  });
  describe('init()', () => {
    describe('when the childArray has never been proxied before', () => {
      describe('and it is not frozen', () => {
        beforeEach(() => {
          originalArray = ['1', '2', '3'];
          arrayProxy = new ArrayProxy(
            originalArray,
            { ids: [], entities: {} },
            childDefinition,
          );
        });
        it('should set the rawArray to the childArray and set the childArray to an empty array', () => {
          assertArrayProxy(!!arrayProxy);
          arrayProxy.init();
          // make sure rawArray is the same object as the original array
          expect(arrayProxy.rawArray).toBe(originalArray);
          expect(arrayProxy.length).toEqual(3);
          expect(
            castTo<{ childArray: string[] }>(arrayProxy).childArray,
          ).toEqual([]);
        });
      });
      describe('and the childArray  is frozen', () => {
        beforeEach(() => {
          originalArray = ['1', '2', '3'];
          Object.freeze(originalArray);
          arrayProxy = new ArrayProxy(
            originalArray,
            { ids: [], entities: {} },
            childDefinition,
          );
          arrayProxy.init();
        });
        it('should set the rawArray a copy of the childArray and set the childArray to an empty array', () => {
          assertArrayProxy(!!arrayProxy);
          expect(arrayProxy.rawArray).not.toBe(originalArray);
          expect(arrayProxy.rawArray).toEqual(originalArray);
          expect(arrayProxy.length).toEqual(3);
          expect(
            castTo<{ childArray: string[] }>(arrayProxy).childArray,
          ).toEqual([]);
        });
      });
    });
    describe('when the childArray has been proxied before', () => {
      describe('and it is not frozen', () => {
        beforeEach(() => {
          originalArray = ['1', '2', '3'];
          arrayProxy = new ArrayProxy(
            originalArray,
            { ids: [], entities: {} },
            childDefinition,
          );
          arrayProxy.init();
          arrayProxy = new ArrayProxy(
            arrayProxy,
            { ids: [], entities: {} },
            childDefinition,
          );
        });
        it('should set the rawArray to the childArray and set the childArray to an empty array', () => {
          assertArrayProxy(!!arrayProxy);
          arrayProxy.init();
          // make sure rawArray is the same object as the original array
          expect(arrayProxy.rawArray).toBe(originalArray);
          expect(arrayProxy.length).toEqual(3);
          expect(
            castTo<{ childArray: string[] }>(arrayProxy).childArray,
          ).toEqual([]);
        });
      });
    });
  });
  describe('getAtIndex()', () => {
    describe('when rawArray is a regular array', () => {
      beforeEach(() => {
        originalArray = ['id1', 'id2', 'id3'];
        arrayProxy = new ArrayProxy(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });

      it('should return the correct id at the given index', () => {
        assertArrayProxy(!!arrayProxy);
        expect(arrayProxy.getIdAtIndex(0)).toBe('id1');
        expect(arrayProxy.getIdAtIndex(1)).toBe('id2');
        expect(arrayProxy.getIdAtIndex(2)).toBe('id3');
      });

      it('should return undefined for an out-of-bounds index', () => {
        assertArrayProxy(!!arrayProxy);
        expect(arrayProxy.getIdAtIndex(3)).toBeUndefined();
        expect(arrayProxy.getIdAtIndex(-1)).toBeUndefined();
      });
    });

    describe('when rawArray is a VirtualArray', () => {
      let mockVirtualArray: VirtualArray<SmartNgRXRowBase>;

      beforeEach(() => {
        mockVirtualArray = new VirtualArray(
          { indexes: ['vid1', 'vid2', 'vid3'], length: 3 },
          {} as ActionGroup,
          'parentId',
          'children',
        );
        arrayProxy = new ArrayProxy(
          mockVirtualArray as unknown as string[],
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });

      it('should return the correct id at the given index', () => {
        assertArrayProxy(!!arrayProxy);
        expect(arrayProxy.getIdAtIndex(0)).toBe('vid1');
        expect(arrayProxy.getIdAtIndex(1)).toBe('vid2');
        expect(arrayProxy.getIdAtIndex(2)).toBe('vid3');
      });

      it('should return fake id for an out-of-bounds index', () => {
        assertArrayProxy(!!arrayProxy);
        expect(arrayProxy.getIdAtIndex(3)).toBeUndefined();
        expect(arrayProxy.getIdAtIndex(-1)).toBeUndefined();
      });
    });

    describe('when the index is between 0 and the length of the array', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
        arrayProxy.getAtIndex(0);
        arrayProxy.getAtIndex(1);
        arrayProxy.getAtIndex(2);
      });
      it('should call getArrayItem', () => {
        assertArrayProxy(!!arrayProxy);
        expect(getArrayItemSpy).toHaveBeenCalledTimes(3);
      });
    });
    describe('when the index is negative', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });
      it('should throw exception', () => {
        expect(() => {
          assertArrayProxy(!!arrayProxy);
          arrayProxy.getAtIndex(-1);
        }).toThrow('Index out of bounds');
      });
    });
    describe('when the index is length or greater', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });
      it('should throw exception', () => {
        expect(() => {
          assertArrayProxy(!!arrayProxy);
          arrayProxy.getAtIndex(originalArray.length);
        }).toThrow('Index out of bounds');
      });
    });
  });
  describe('createNewParentFromParent()', () => {
    describe('when parent is not a RowProxy', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });
      it('should return a new parent based on the object passed in', () => {
        assertArrayProxy(!!arrayProxy);
        const parent = {
          id: '1',
          name: 'foo',
          isEditing: false,
        };
        const newParent = castTo<{
          createNewParentFromParent(p: object, b: boolean): object;
        }>(arrayProxy).createNewParentFromParent(parent, true);
        expect(newParent).toEqual({
          id: '1',
          name: 'foo',
          isEditing: true,
        });
      });
    });
    describe('when parent is a RowProxy', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });
      it('should return a new parent based on the object passed in', () => {
        assertArrayProxy(!!arrayProxy);
        const parent = {
          id: '1',
          name: 'foo',
          isEditing: false,
        };
        const parentProxy = new RowProxy(
          parent,
          {} as unknown as ActionService,
          {} as unknown as ActionService,
        );
        const newParent = castTo<{
          createNewParentFromParent(p: object, b: boolean): object;
        }>(arrayProxy).createNewParentFromParent(parentProxy, true);
        expect(newParent).toEqual({
          id: '1',
          name: 'foo',
          isEditing: true,
        });
      });
    });
  });
  describe('addToStore()', () => {
    let mockParentService: ActionService;
    let mockChildService: ActionService;
    let mockEntityAdapter: EntityAdapter<SmartNgRXRowBase>;
    let loadByIdsSuccessSpy: jest.SpyInstance;
    describe('with standard array', () => {
      beforeEach(() => {
        mockParentService = {
          loadByIdsSuccess: jest.fn(),
        } as unknown as ActionService;
        mockChildService = {
          loadByIdsSuccess: jest.fn(),
        } as unknown as ActionService;
        mockEntityAdapter = {
          selectId: jest.fn().mockReturnValue('newId'),
        } as unknown as EntityAdapter<SmartNgRXRowBase>;

        arrayProxy = new ArrayProxy(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
        arrayProxy.entityAdapter = mockEntityAdapter;
        arrayProxy.childActionService = mockChildService;

        loadByIdsSuccessSpy = jest.spyOn(mockChildService, 'loadByIdsSuccess');
        jest
          .spyOn(actionServiceRegistry, 'actionServiceRegistry')
          .mockReturnValueOnce(mockParentService)
          .mockReturnValueOnce(mockChildService);
      });

      it('should add a new row to the store when rawArray is an array', () => {
        const newRow = { id: 'newId', name: 'New Row' } as SmartNgRXRowBase;
        const parentRow = {
          id: 'parentId',
          children: originalArray,
        } as SmartNgRXRowBase;

        arrayProxy!.addToStore(newRow, parentRow);

        expect(loadByIdsSuccessSpy).toHaveBeenCalledWith([
          {
            ...parentRow,
            children: [...originalArray, 'newId'],
            isEditing: true,
          },
        ]);
      });
    });
    describe('with virtual array', () => {
      beforeEach(() => {
        mockParentService = {
          loadByIdsSuccess: jest.fn(),
        } as unknown as ActionService;
        mockChildService = {
          loadByIdsSuccess: jest.fn(),
        } as unknown as ActionService;
        mockEntityAdapter = {
          selectId: jest.fn().mockReturnValue('newId'),
        } as unknown as EntityAdapter<SmartNgRXRowBase>;

        const parentAction = actionFactory('parentFeature', 'parentEntity');

        const virtualArray = new VirtualArray(
          {
            indexes: originalArray,
            length: originalArray.length,
          },
          parentAction,
          'parentId',
          'children',
        );

        arrayProxy = new ArrayProxy(
          virtualArray as unknown as string[],
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
        arrayProxy.entityAdapter = mockEntityAdapter;
        arrayProxy.childActionService = mockChildService;

        loadByIdsSuccessSpy = jest.spyOn(mockChildService, 'loadByIdsSuccess');
        jest
          .spyOn(actionServiceRegistry, 'actionServiceRegistry')
          .mockReturnValueOnce(mockParentService)
          .mockReturnValueOnce(mockChildService);
      });
      it('should add a new row to the store when rawArray is a VirtualArray', () => {
        const virtualArray = new VirtualArray(
          { indexes: originalArray, length: originalArray.length },
          {} as ActionGroup,
          'parentId',
          'children',
        );

        const newRow = { id: 'newId', name: 'New Row' } as SmartNgRXRowBase;
        const parentRow = {
          id: 'parentId',
          children: virtualArray,
        } as SmartNgRXRowBase;

        arrayProxy!.addToStore(newRow, parentRow);

        expect(loadByIdsSuccessSpy).toHaveBeenCalledWith([
          {
            ...parentRow,
            children: {
              indexes: [...originalArray, 'newId'],
              length: originalArray.length + 1,
            },
            isEditing: true,
          },
        ]);
      });
    });
  });
  describe('removeChildIdFromChildArray', () => {
    let mockParentService: ActionService;
    let loadByIdsSuccessSpy: jest.SpyInstance;

    beforeEach(() => {
      mockParentService = {
        loadByIdsSuccess: jest.fn(),
      } as unknown as ActionService;

      arrayProxy = new ArrayProxy(
        [],
        { ids: [], entities: {} },
        childDefinition,
      );
      arrayProxy.init();

      // Mock the getServices method to return our mock parent service
      jest
        .spyOn(
          arrayProxy as unknown as {
            getServices(): { parentService: ActionService };
          },
          'getServices',
        )
        .mockReturnValue({
          parentService: mockParentService,
        });

      loadByIdsSuccessSpy = jest.spyOn(mockParentService, 'loadByIdsSuccess');
    });

    describe('with regular array', () => {
      it('should remove the child id from the parent array', () => {
        const entity = {
          ids: ['parent1'],
          entities: {
            parent1: {
              id: 'parent1',
              children: ['child1', 'child2', 'child3'],
              isEditing: true,
            },
          },
        } as EntityState<Row>;

        const parentId = 'parent1';
        const parentField = 'children';
        const childId = 'child2';

        (arrayProxy as PublicArrayProxy).removeChildIdFromChildArray(
          entity,
          parentId,
          parentField,
          childId,
        );

        expect(loadByIdsSuccessSpy).toHaveBeenCalledWith([
          {
            id: 'parent1',
            children: ['child1', 'child3'],
            isEditing: false,
          },
        ]);
      });

      it('should not modify the array if the child id is not present', () => {
        const entity = {
          ids: ['parent1'],
          entities: {
            parent1: {
              id: 'parent1',
              children: ['child1', 'child3'],
              isEditing: true,
            },
          },
        } as EntityState<Row>;
        const parentId = 'parent1';
        const parentField = 'children';
        const childId = 'child2';

        (arrayProxy as PublicArrayProxy).removeChildIdFromChildArray(
          entity,
          parentId,
          parentField,
          childId,
        );

        expect(loadByIdsSuccessSpy).not.toHaveBeenCalled();
      });
    });

    describe('with virtual array', () => {
      it('should mark the child id as "delete" in the virtual array', () => {
        const entity = {
          ids: ['parent1'],
          entities: {
            parent1: {
              id: 'parent1',
              children: {
                indexes: ['child1', 'child2', 'child3'],
                length: 3,
              },
              isEditing: true,
            },
          },
        } as EntityState<RowWithVirtualChildren>;
        const parentId = 'parent1';
        const parentField = 'children';
        const childId = 'child2';

        (arrayProxy as PublicArrayProxy).removeChildIdFromChildArray(
          entity,
          parentId,
          parentField,
          childId,
        );

        expect(loadByIdsSuccessSpy).toHaveBeenCalledWith([
          {
            id: 'parent1',
            children: {
              indexes: ['child1', 'delete', 'child3'],
              length: 2,
            },
            isEditing: false,
          },
        ]);
      });

      it('should not modify the virtual array if the child id is not present', () => {
        const entity = {
          ids: ['parent1'],
          entities: {
            parent1: {
              id: 'parent1',
              children: {
                indexes: ['child1', 'child3', 'child4'],
                length: 3,
              },
              isEditing: true,
            },
          },
        } as EntityState<RowWithVirtualChildren>;
        const parentId = 'parent1';
        const parentField = 'children';
        const childId = 'child2';

        (arrayProxy as PublicArrayProxy).removeChildIdFromChildArray(
          entity,
          parentId,
          parentField,
          childId,
        );

        expect(loadByIdsSuccessSpy).not.toHaveBeenCalled();
      });
    });

    it('should throw an error if the parent row is undefined', () => {
      const entity = { ids: [], entities: {} };
      const parentId = 'nonexistent';
      const parentField = 'children';
      const childId = 'child1';

      expect(() => {
        (arrayProxy as PublicArrayProxy).removeChildIdFromChildArray(
          entity,
          parentId,
          parentField,
          childId,
        );
      }).toThrow('parentRow is undefined');
    });
  });
});
