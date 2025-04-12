import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import {
  childDefinitionRegistry,
  entityDefinitionRegistry,
  entityRegistry,
  entityRowsRegistry,
  featureRegistry,
  serviceRegistry,
  SmartNgRXRowBase,
  virtualArrayMap,
} from '@smarttools/core';
import { asapScheduler, of, Subscription } from 'rxjs';

import * as storeFunction from '../../smart-selector/store.function';
import { ActionGroup } from '../../types/action-group.interface';
import * as actionFactory from './action.factory';
import { ClassicNgrxFacade } from './classic-ngrx.facade';
import * as watchInitialRowModule from './watch-initial-row.function';

jest.mock('../registrations/feature-registry.class');
jest.mock('../registrations/entity-definition-registry.function');
jest.mock('../registrations/entity-registry.class');
jest.mock('./classic-ngrx.facade/action.factory');
jest.mock('../smart-selector/store.function');
jest.mock('../registrations/service-registry.class');

jest.mock('../smart-selector/virtual-array-map.const');

interface MockEntity extends SmartNgRXRowBase {
  id: string;
  name?: string;
  age?: number;
  unchanged?: string;
  newProp?: string;
  isEditing?: boolean;
}

interface TestableActionService
  extends Omit<
    ClassicNgrxFacade,
    | 'actions'
    | 'forceDirty'
    | 'garbageCollectWithEntities'
    | 'markDirtyFetchesNew'
    | 'optimisticUpdate'
    | 'removeFromParents'
    | 'updateMany'
  > {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any -- intentional for test
  markDirtyFetchesNew: boolean;
  forceDirty(ids: string[]): void;
  actions: ActionGroup;
  optimisticUpdate(oldRow: MockEntity, newRow: MockEntity): void;
  updateMany(updates: { id: string; changes: Partial<MockEntity> }[]): void;
  removeFromParents(id: string): string[];
  selectId(row: MockEntity): string;
  garbageCollectWithEntities(
    entities: Dictionary<MockEntity>,
    idsToRemove: string[],
  ): void;
}

describe('ActionService', () => {
  let service: TestableActionService;
  let mockStore: jest.Mocked<Store>;
  let mockEffectService: { init: jest.Mock };

  beforeEach(() => {
    mockStore = {
      select: jest.fn().mockReturnValue(of({})),
      dispatch: jest.fn(),
    } as unknown as jest.Mocked<Store>;

    mockEffectService = {
      init: jest.fn(),
    };

    (storeFunction.store as jest.Mock).mockReturnValue(mockStore);
    (serviceRegistry.get as jest.Mock).mockReturnValue(mockEffectService);

    // Mock the entityDefinitionRegistry with proper entityAdapter
    (entityDefinitionRegistry as jest.Mock).mockReturnValue({
      entityAdapter: {
        selectId: (row: MockEntity) => row.id,
        getSelectors: () => ({ selectEntities: jest.fn() }),
      },
      selectId: (row: MockEntity) => row.id,
    });

    TestBed.configureTestingModule({
      providers: [ClassicNgrxFacade, { provide: Store, useValue: mockStore }],
    });

    service = new ClassicNgrxFacade(
      'testFeature',
      'testEntity',
    ) as unknown as TestableActionService;

    // Reset mocks after service creation
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('init', () => {
    it('should return false if feature is not registered', () => {
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(false);
      expect(service.init()).toBeFalsy();
    });

    it('should initialize successfully if feature is registered', () => {
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({});
      (entityDefinitionRegistry as jest.Mock).mockReturnValue({
        entityAdapter: {
          selectId: (row: MockEntity) => row.id,
          getSelectors: () => ({ selectEntities: jest.fn() }),
        },
        selectId: (row: MockEntity) => row.id,
      });
      (entityRegistry.get as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      expect(service.init()).toBeTruthy();
    });

    it('should return true if init has already been called', () => {
      const spy = jest.spyOn(featureRegistry, 'hasFeature');
      service.init();
      jest.resetAllMocks();
      expect(service.init()).toBeTruthy();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should call watchInitialRow when isInitialRow is true', () => {
      // Mock dependencies
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({});
      (entityDefinitionRegistry as jest.Mock).mockReturnValue({
        entityAdapter: {
          selectId: (row: MockEntity) => row.id,
          getSelectors: () => ({ selectEntities: jest.fn() }),
        },
        selectId: (row: MockEntity) => row.id,
        isInitialRow: true,
      });
      (entityRegistry.get as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      // Mock watchInitialRow
      const watchInitialRowSpy = jest
        .spyOn(watchInitialRowModule, 'watchInitialRow')
        .mockReturnValue(of({ ids: [], entities: {} }));

      // Initialize the service
      service.init();

      // Verify watchInitialRow was called with correct parameters
      expect(watchInitialRowSpy).toHaveBeenCalledWith(
        'testFeature',
        'testEntity',
      );
    });

    it('should not call watchInitialRow when isInitialRow is false', () => {
      // Mock dependencies
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({});
      (entityDefinitionRegistry as jest.Mock).mockReturnValue({
        entityAdapter: {
          selectId: (row: MockEntity) => row.id,
          getSelectors: () => ({ selectEntities: jest.fn() }),
        },
        selectId: (row: MockEntity) => row.id,
        isInitialRow: false,
      });
      (entityRegistry.get as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      // Mock watchInitialRow
      const watchInitialRowSpy = jest
        .spyOn(watchInitialRowModule, 'watchInitialRow')
        .mockReturnValue(of({ ids: [], entities: {} }));

      // Initialize the service
      service.init();

      // Verify watchInitialRow was not called
      expect(watchInitialRowSpy).not.toHaveBeenCalled();
    });

    it('should use entityDefinition.selectId when available', () => {
      // Mock dependencies
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({});

      // Mock with entityDefinition.selectId defined
      const entityDefinitionSelectId = jest.fn(
        (row: MockEntity) => `entity-${row.id}`,
      );
      const entityAdapterSelectId = jest.fn(
        (row: MockEntity) => `adapter-${row.id}`,
      );

      (entityDefinitionRegistry as jest.Mock).mockReturnValue({
        entityAdapter: {
          selectId: entityAdapterSelectId,
          getSelectors: () => ({ selectEntities: jest.fn() }),
        },
        selectId: entityDefinitionSelectId,
      });

      (entityRegistry.get as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      // Create a new service instance for this test
      const testService = new ClassicNgrxFacade(
        'testFeature',
        'testEntity',
      ) as unknown as TestableActionService;

      // Initialize the service
      testService.init();

      // Create test entity
      const testEntity: MockEntity = { id: '1', name: 'test' };

      // Test that service.selectId uses entityDefinition.selectId
      const result = testService.selectId(testEntity);

      expect(result).toBe('entity-1');
      expect(entityDefinitionSelectId).toHaveBeenCalledWith(testEntity);
      expect(entityAdapterSelectId).not.toHaveBeenCalled();
    });

    it('should fall back to entityAdapter.selectId when entityDefinition.selectId is not available', () => {
      // Mock dependencies
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({});

      // Mock with entityDefinition.selectId undefined
      const entityAdapterSelectId = jest.fn(
        (row: MockEntity) => `adapter-${row.id}`,
      );

      // Need to set entityAdapter before entityDefinition to avoid "cannot read property selectId"
      const mockEntityAdapter = {
        selectId: entityAdapterSelectId,
        getSelectors: () => ({
          selectIds: jest.fn(),
          selectEntities: jest.fn(),
          selectAll: jest.fn(),
          selectTotal: jest.fn(),
        }),
      };

      // Create a new service instance for this test
      const testService = new ClassicNgrxFacade(
        'testFeature',
        'testEntity',
      ) as unknown as TestableActionService;

      // Set the entityAdapter before init
      testService.entityAdapter =
        mockEntityAdapter as unknown as EntityAdapter<MockEntity>;

      (entityDefinitionRegistry as jest.Mock).mockReturnValue({
        entityAdapter: mockEntityAdapter,
        // No selectId property defined
      });

      (entityRegistry.get as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      // Initialize the service
      testService.init();

      // Create test entity
      const testEntity: MockEntity = { id: '1', name: 'test' };

      // Test that service.selectId uses entityAdapter.selectId
      const result = testService.selectId(testEntity);

      expect(result).toBe('adapter-1');
      expect(entityAdapterSelectId).toHaveBeenCalledWith(testEntity);
    });

    it('should fall back to entityAdapter.selectId when entityDefinition.selectId is null', () => {
      // Mock dependencies
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({});

      // Mock with entityDefinition.selectId set to null
      const entityAdapterSelectId = jest.fn(
        (row: MockEntity) => `adapter-${row.id}`,
      );

      // Need to set entityAdapter before entityDefinition to avoid "cannot read property selectId"
      const mockEntityAdapter = {
        selectId: entityAdapterSelectId,
        getSelectors: () => ({
          selectIds: jest.fn(),
          selectEntities: jest.fn(),
          selectAll: jest.fn(),
          selectTotal: jest.fn(),
        }),
      };

      // Create a new service instance for this test
      const testService = new ClassicNgrxFacade(
        'testFeature',
        'testEntity',
      ) as unknown as TestableActionService;

      // Set the entityAdapter before init
      testService.entityAdapter =
        mockEntityAdapter as unknown as EntityAdapter<MockEntity>;

      (entityDefinitionRegistry as jest.Mock).mockReturnValue({
        entityAdapter: mockEntityAdapter,
        selectId: null,
      });

      (entityRegistry.get as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      // Initialize the service
      testService.init();

      // Create test entity
      const testEntity: MockEntity = { id: '1', name: 'test' };

      // Test that service.selectId uses entityAdapter.selectId
      const result = testService.selectId(testEntity);

      expect(result).toBe('adapter-1');
      expect(entityAdapterSelectId).toHaveBeenCalledWith(testEntity);
    });
  });

  describe('after initialization', () => {
    beforeEach(() => {
      // Set up mocks for successful initialization
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({
        remove: jest.fn().mockReturnValue({ type: 'REMOVE_ACTION' }),
        updateMany: jest.fn().mockReturnValue({ type: 'UPDATE_MANY_ACTION' }),
      });
      (entityDefinitionRegistry as jest.Mock).mockReturnValue({
        entityAdapter: {
          getSelectors: () => ({ selectEntities: jest.fn() }),
          selectId: (row: MockEntity) => row.id,
        },
        selectId: (row: MockEntity) => row.id,
      });
      (entityRegistry.get as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      // Mock store.select to return a valid entities Observable
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- needed for testing
      mockStore.select = jest.fn().mockReturnValue(
        of({
          '1': { id: '1', name: 'test' },
          '2': { id: '2', name: 'test2' },
        }),
      );

      // Initialize the service
      service = new ClassicNgrxFacade(
        'testFeature',
        'testEntity',
      ) as unknown as TestableActionService;
      service.init();
    });

    describe('optimisticUpdate', () => {
      it('should only update changed properties', () => {
        const updateManySpy = jest.spyOn(service, 'updateMany');
        const oldRow: MockEntity = {
          id: '1',
          name: 'old',
          age: 30,
          unchanged: 'same',
        };
        const newRow: MockEntity = {
          id: '1',
          name: 'new',
          age: 31,
          unchanged: 'same',
        };

        service.optimisticUpdate(oldRow, newRow);

        expect(updateManySpy).toHaveBeenCalledWith([
          {
            id: '1',
            changes: {
              name: 'new',
              age: 31,
            },
          },
        ]);
      });

      it('should not update when properties are the same', () => {
        const updateManySpy = jest.spyOn(service, 'updateMany');
        const oldRow: MockEntity = { id: '1', name: 'same', age: 30 };
        const newRow: MockEntity = { id: '1', name: 'same', age: 30 };

        service.optimisticUpdate(oldRow, newRow);

        expect(updateManySpy).toHaveBeenCalledWith([
          {
            id: '1',
            changes: {},
          },
        ]);
      });

      it('should handle new properties in newRow', () => {
        const updateManySpy = jest.spyOn(service, 'updateMany');
        const oldRow: MockEntity = { id: '1', name: 'old' };
        const newRow: MockEntity = { id: '1', name: 'old', newProp: 'value' };

        service.optimisticUpdate(oldRow, newRow);

        expect(updateManySpy).toHaveBeenCalledWith([
          {
            id: '1',
            changes: {
              newProp: 'value',
            },
          },
        ]);
      });

      it('should handle string id conversion', () => {
        const updateManySpy = jest.spyOn(service, 'updateMany');
        const oldRow: MockEntity = { id: '1', name: 'old' };
        const newRow: MockEntity = { id: '1', name: 'new' };

        service.optimisticUpdate(oldRow, newRow);

        expect(updateManySpy).toHaveBeenCalledWith([
          {
            id: '1',
            changes: {
              name: 'new',
            },
          },
        ]);
      });
    });

    describe('markDirty', () => {
      it('should not fetch new data if markDirtyFetchesNew is false', () => {
        // Set markDirtyFetchesNew to false
        service.markDirtyFetchesNew = false;

        const spy = jest.spyOn(service, 'forceDirty');

        service.markDirty(['1', '2']);

        expect(spy).not.toHaveBeenCalled();
      });

      it('should fetch new data if markDirtyFetchesNew is true', () => {
        // Set markDirtyFetchesNew to true
        service.markDirtyFetchesNew = true;

        const spy = jest.spyOn(service, 'forceDirty');

        service.markDirty(['1', '2']);

        expect(spy).toHaveBeenCalledWith(['1', '2']);
      });
    });

    describe('garbageCollect', () => {
      it('should not remove entities that are being edited', fakeAsync(() => {
        const mockEntities: Record<string, MockEntity> = {
          '1': { id: '1', isEditing: true },
          '2': { id: '2', isEditing: false },
        };

        // Mock the store's select method to return our mock entities
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- needed for testing
        mockStore.select.mockReturnValue(of(mockEntities));

        // Mock unregister to return ids for filtering
        jest.spyOn(entityRowsRegistry, 'unregister').mockReturnValue(['2']);

        // Mock virtualArrayMap.remove to prevent undefined errors
        (virtualArrayMap.remove as jest.Mock) = jest.fn();

        // Mock asapScheduler.schedule to prevent errors
        jest.spyOn(asapScheduler, 'schedule').mockImplementation(() => {
          // No need to call the function as we're just preventing errors
          return new Subscription();
        });

        service.garbageCollect(['1', '2']);

        // Advance the virtual clock to complete all pending asynchronous activities
        tick();

        // eslint-disable-next-line @typescript-eslint/unbound-method -- safe because it is a test
        expect(mockStore.dispatch).toHaveBeenCalledWith(
          expect.objectContaining(service.actions.remove({ ids: ['2'] })),
        );
      }));

      it('should correctly cover the condition when idsToRemove.length is 0', () => {
        // This is a direct coverage of the early return condition in the
        // private garbageCollectWithEntities method

        // Create a dictionary with entities that all have isEditing = true
        const mockEntities: Dictionary<MockEntity> = {
          '1': { id: '1', isEditing: true },
          '2': { id: '2', isEditing: true },
        };

        // Mock the store dispatch
        mockStore.dispatch.mockClear();

        // This will exercise the code path where ids are filtered to an empty array
        service.garbageCollectWithEntities(mockEntities, ['1', '2']);

        // And dispatch should not have been called
        // eslint-disable-next-line @typescript-eslint/unbound-method -- safe because it is a test
        expect(mockStore.dispatch).not.toHaveBeenCalled();
      });
    });

    // ... other tests for initialized service
  });

  describe('removeFromParents', () => {
    it('should return empty array if no child definitions', () => {
      jest
        .spyOn(childDefinitionRegistry, 'getChildDefinition')
        .mockReturnValue([]);

      const result = service.removeFromParents('1');

      expect(result).toEqual([]);
    });
  });
});
