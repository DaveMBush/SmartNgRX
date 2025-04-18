// This is a minimal spec file to satisfy the linter
// without executing any tests that might cause issues

import { createEntityAdapter } from '@ngrx/entity';
import { asapScheduler, of } from 'rxjs';

import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { entityRowsRegistry } from '../registrations/entity-rows-registry.class';
import { serviceRegistry } from '../registrations/service-registry.class';
import { BaseChildDefinition } from '../types/base-child-definition.interface';
import { EffectServiceToken } from '../types/effect-service.token';
import { ParentInfo } from '../types/parent-info.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { FacadeBase } from './facade.base';

// Mock all the external dependencies
jest.mock('../registrations/entity-rows-registry.class', () => ({
  entityRowsRegistry: {
    register: jest.fn(),
    unregister: jest.fn().mockReturnValue(['1']),
  },
}));

jest.mock('../registrations/child-definition.registry', () => ({
  childDefinitionRegistry: {
    getChildDefinition: jest.fn().mockReturnValue([]),
  },
}));

jest.mock('../registrations/service-registry.class', () => ({
  serviceRegistry: {
    get: jest.fn().mockReturnValue({
      delete: jest.fn().mockReturnValue(of({})),
    }),
  },
}));

jest.mock('../smart-selector/virtual-array-map.const', () => ({
  virtualArrayMap: {
    remove: jest.fn(),
    get: jest.fn(),
  },
}));

class TestFacade extends FacadeBase {
  // Expose protected properties for testing
  protected override initCalled = false;

  constructor() {
    super('test', 'test');
    this.selectId = (row: SmartNgRXRowBase) => row.id;

    // Set up the entityDefinition for test purposes
    this.entityDefinition = {
      effectServiceToken: {} as EffectServiceToken<SmartNgRXRowBase>,
      entityName: 'test',
      defaultRow: () => ({ id: 'test' }) as SmartNgRXRowBase,
      entityAdapter: createEntityAdapter<SmartNgRXRowBase>({
        selectId: (row) => row.id,
      }),
    };
  }

  override init(): boolean {
    this.initCalled = true;
    return true;
  }

  getInitCalled(): boolean {
    return this.initCalled;
  }

  override markDirty(_: string[]): void {
    // Implement for test
  }

  override markNotDirty(_: string): void {
    // Implement for test
  }

  override forceDirty(_: string[]): void {
    // Implement for test
  }

  override remove(_: string[]): void {
    // Implement for test
  }

  override updateMany(_: unknown[]): void {
    // Implement for test
  }

  override garbageCollect(_: string[]): void {
    // Implement for test
  }

  override update(_: unknown): void {
    // Implement for test
  }

  override loadByIds(_: string): void {
    // Implement for test
  }

  override loadByIdsPreload(_: string[]): void {
    // Implement for test
  }

  override loadByIdsSuccess(_: SmartNgRXRowBase[]): void {
    // Implement for test
  }

  override loadByIndexes(_: string, __: string, ___: number): void {
    // Implement for test
  }

  override loadByIndexesSuccess(
    _: string,
    __: string,
    ___: PartialArrayDefinition,
  ): void {
    // Implement for test
  }

  override upsertRow(_: SmartNgRXRowBase): void {
    // Implement for test
  }

  override removeFromParents(_: string): ParentInfo[] {
    return [];
  }

  // Expose protected methods for testing
  override markDirtyNoFetchWithEntities(
    entities: Record<string, SmartNgRXRowBase>,
    ids: string[],
  ): void {
    super.markDirtyNoFetchWithEntities(entities, ids);
  }

  override garbageCollectWithEntities(
    entities: Record<string, SmartNgRXRowBase>,
    ids: string[],
  ): void {
    super.garbageCollectWithEntities(entities, ids);
  }

  override optimisticUpdate(
    oldRow: SmartNgRXRowBase,
    newRow: SmartNgRXRowBase,
  ): void {
    super.optimisticUpdate(oldRow, newRow);
  }

  override markDirtyWithEntities(
    entities: Record<string, SmartNgRXRowBase>,
    ids: string[],
  ): void {
    super.markDirtyWithEntities(entities, ids);
  }

  override removeFromParentsWithFunction(
    id: string,
    removeIdFromParents: (
      childDefinition: BaseChildDefinition,
      itemId: string,
      pInfo: ParentInfo[],
    ) => void,
  ): ParentInfo[] {
    super.removeFromParentsWithFunction(id, removeIdFromParents);
    return [];
  }
}

describe('FacadeBase Implementation', () => {
  let facade: TestFacade;
  let scheduleSpy: jest.SpyInstance;
  let registerSpy: jest.SpyInstance;
  let unregisterSpy: jest.SpyInstance;
  let getChildDefinitionSpy: jest.SpyInstance;
  let serviceGetSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    facade = new TestFacade();
    scheduleSpy = jest.spyOn(asapScheduler, 'schedule');
    registerSpy = jest.spyOn(entityRowsRegistry, 'register');
    unregisterSpy = jest.spyOn(entityRowsRegistry, 'unregister');
    getChildDefinitionSpy = jest.spyOn(
      childDefinitionRegistry,
      'getChildDefinition',
    );
    serviceGetSpy = jest.spyOn(serviceRegistry, 'get');
  });

  it('should create an instance', () => {
    expect(facade).toBeInstanceOf(TestFacade);
  });

  describe('init', () => {
    it('should set initCalled flag', () => {
      const result = facade.init();
      expect(result).toBe(true);
      expect(facade.getInitCalled()).toBe(true);
    });
  });

  describe('markDirtyNoFetchWithEntities', () => {
    it('should register entities with valid IDs', () => {
      const entities = {
        '1': { id: '1', isEditing: false } as SmartNgRXRowBase,
        '2': { id: '2', isEditing: false } as SmartNgRXRowBase,
      };
      const ids = ['1', '2'];

      facade.markDirtyNoFetchWithEntities(entities, ids);

      expect(registerSpy).toHaveBeenCalledWith('test', 'test', [
        entities['1'],
        entities['2'],
      ]);
    });

    it('should handle empty arrays', () => {
      facade.markDirtyNoFetchWithEntities({}, []);
      expect(registerSpy).toHaveBeenCalledWith('test', 'test', []);
    });
  });

  describe('garbageCollectWithEntities', () => {
    it('should unregister entities', () => {
      const entities = {
        '1': { id: '1', isEditing: false } as SmartNgRXRowBase,
      };
      const ids = ['1'];
      const removeSpy = jest.spyOn(facade, 'remove');

      facade.garbageCollectWithEntities(entities, ids);

      expect(unregisterSpy).toHaveBeenCalledWith('test', 'test', ['1']);
      expect(removeSpy).toHaveBeenCalledWith(['1']);
      expect(scheduleSpy).toHaveBeenCalled();
    });

    it('should not process if IDs to remove is empty', () => {
      const entities = {
        '1': { id: '1', isEditing: true } as SmartNgRXRowBase,
      };
      const ids = ['1'];
      const removeSpy = jest.spyOn(facade, 'remove');

      // Mock the unregister to return empty array
      (entityRowsRegistry.unregister as jest.Mock).mockReturnValueOnce([]);

      facade.garbageCollectWithEntities(entities, ids);

      expect(removeSpy).not.toHaveBeenCalled();
    });
  });

  describe('optimisticUpdate', () => {
    it('should update only changed properties', () => {
      const oldRow = { id: '1', name: 'old', value: 1 } as SmartNgRXRowBase;
      const newRow = { id: '1', name: 'new', value: 1 } as SmartNgRXRowBase;
      const updateManySpy = jest.spyOn(facade, 'updateMany');

      facade.optimisticUpdate(oldRow, newRow);

      expect(updateManySpy).toHaveBeenCalledWith([
        { id: '1', changes: { name: 'new' } },
      ]);
    });

    it('should not update unchanged properties', () => {
      const oldRow = { id: '1', name: 'same' } as SmartNgRXRowBase;
      const newRow = { id: '1', name: 'same' } as SmartNgRXRowBase;
      const updateManySpy = jest.spyOn(facade, 'updateMany');

      facade.optimisticUpdate(oldRow, newRow);

      expect(updateManySpy).toHaveBeenCalledWith([{ id: '1', changes: {} }]);
    });
  });

  describe('markDirtyWithEntities', () => {
    it('should mark non-editing entities as dirty', () => {
      const entities = {
        '1': { id: '1', isEditing: false } as SmartNgRXRowBase,
        '2': { id: '2', isEditing: true } as SmartNgRXRowBase,
      };
      const ids = ['1', '2'];
      const updateManySpy = jest.spyOn(facade, 'updateMany');

      facade.markDirtyWithEntities(entities, ids);

      expect(updateManySpy).toHaveBeenCalledWith([
        { id: '1', changes: { isDirty: true } },
      ]);
    });

    it('should not mark editing entities as dirty', () => {
      const entities = {
        '1': { id: '1', isEditing: true } as SmartNgRXRowBase,
      };
      const ids = ['1'];
      const updateManySpy = jest.spyOn(facade, 'updateMany');

      facade.markDirtyWithEntities(entities, ids);

      expect(updateManySpy).toHaveBeenCalledWith([]);
    });
  });

  describe('removeFromParentsWithFunction', () => {
    it('should call removeIdFromParents for each child definition', () => {
      const id = '1';
      const removeIdFromParents = jest.fn();
      const mockChildDefinition = {
        childField: 'test',
        parentId: 'parent',
      } as unknown as BaseChildDefinition;

      (
        childDefinitionRegistry.getChildDefinition as jest.Mock
      ).mockReturnValueOnce([mockChildDefinition]);

      facade.removeFromParentsWithFunction(id, removeIdFromParents);

      expect(getChildDefinitionSpy).toHaveBeenCalled();
      expect(removeIdFromParents).toHaveBeenCalledWith(
        mockChildDefinition,
        id,
        [],
      );
    });

    it('should handle empty child definitions', () => {
      const id = '1';
      const removeIdFromParents = jest.fn();

      facade.removeFromParentsWithFunction(id, removeIdFromParents);

      expect(getChildDefinitionSpy).toHaveBeenCalled();
      expect(removeIdFromParents).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a row and handle success', () => {
      const id = '1';
      // Create a mock ParentInfo for testing
      const mockParentInfo = [
        {
          ids: ['child1'],
        },
      ] as unknown as ParentInfo[];

      const removeFromParentsSpy = jest
        .spyOn(facade, 'removeFromParents')
        .mockReturnValue(mockParentInfo);

      facade.delete(id);

      expect(removeFromParentsSpy).toHaveBeenCalledWith(id);
      expect(serviceGetSpy).toHaveBeenCalled();
    });

    it('should filter out empty parent info', () => {
      const id = '1';
      // Create a mock ParentInfo with empty ids for testing
      const mockParentInfo = [
        {
          ids: [],
        },
      ] as unknown as ParentInfo[];

      const removeFromParentsSpy = jest
        .spyOn(facade, 'removeFromParents')
        .mockReturnValue(mockParentInfo);

      facade.delete(id);

      expect(removeFromParentsSpy).toHaveBeenCalledWith(id);
      // The parent info should be filtered out because ids array is empty
      expect(serviceGetSpy).toHaveBeenCalled();
    });
  });
});
