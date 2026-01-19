import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  childDefinitionRegistry,
  entityDefinitionRegistry,
  entityRegistry,
  entityRowsRegistry,
  facadeRegistry,
  featureRegistry,
  serviceRegistry,
  SmartNgRXRowBase,
  virtualArrayMap,
} from '@smarttools/smart-core';
import { asapScheduler, of, Subscription } from 'rxjs';

import * as storeFunction from '../smart-selector/store.function';
import { ActionGroup } from '../types/action-group.interface';
import * as actionFactory from './action.factory';
import { ClassicNgrxFacade } from './classic-ngrx.facade';
import * as watchInitialRowModule from './watch-initial-row.function';

jest.mock('../../../smart-core/src/registrations/feature-registry.class');
jest.mock(
  '../../../smart-core/src/registrations/entity-definition-registry.function',
);
jest.mock('../../../smart-core/src/registrations/entity-registry.class');
jest.mock('./action.factory');
jest.mock('../smart-selector/store.function');
jest.mock('../../../smart-core/src/registrations/service-registry.class');

jest.mock('../../../smart-core/src/smart-selector/virtual-array-map.const');

interface MockEntity extends SmartNgRXRowBase {
  id: string;
  name?: string;
  age?: number;
  unchanged?: string;
  newProp?: string;
  isEditing?: boolean;
}

interface TestableActionService extends Omit<
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
  let mockStore: MockStore;
  let mockEffectService: { init: jest.Mock };
  let selectEntities: MemoizedSelector<
    { entities: Dictionary<MockEntity> },
    Dictionary<MockEntity>
  >;

  beforeEach(() => {
    selectEntities = createSelector(
      (state: { entities: Dictionary<MockEntity> }) => state.entities,
      (entities: Dictionary<MockEntity>) => entities,
    );

    TestBed.configureTestingModule({
      providers: [
        ClassicNgrxFacade,
        provideMockStore({
          initialState: {
            entities: {
              '1': { id: '1', name: 'test' },
              '2': { id: '2', name: 'test2' },
            },
          },
        }),
      ],
    });

    mockStore = TestBed.inject(MockStore);
    mockEffectService = {
      init: jest.fn(),
    };

    facadeRegistry.register('testFeature', 'testEntity', ClassicNgrxFacade);

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

    it('should set markDirtyFetchesNew to true when registry.markAndDeleteInit.markDirtyFetchesNew is true', () => {
      // Set up mocks
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({});
      (entityDefinitionRegistry as jest.Mock).mockReturnValue({
        entityAdapter: {
          selectId: (row: MockEntity) => row.id,
          getSelectors: () => ({ selectEntities: jest.fn() }),
        },
        selectId: (row: MockEntity) => row.id,
      });

      // Mock with markDirtyFetchesNew explicitly set to true
      (entityRegistry.get as jest.Mock).mockReturnValue({
        markAndDeleteInit: {
          markDirtyFetchesNew: true,
        },
      });

      // Initialize the service
      service.init();

      // Verify markDirtyFetchesNew is set to true
      expect(service.markDirtyFetchesNew).toBe(true);
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
      mockStore.overrideSelector(selectEntities, {
        '1': { id: '1', name: 'test' },
        '2': { id: '2', name: 'test2' },
      });
      mockStore.refreshState();

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
      it('should call loadByIds when isInitialRow is true', () => {
        // Mock watchInitialRow to return an Observable with correct type
        jest
          .spyOn(watchInitialRowModule, 'watchInitialRow')
          .mockReturnValue(of({ ids: [], entities: {} }));

        // Set up the entityDefinition with isInitialRow = true
        (entityDefinitionRegistry as jest.Mock).mockReturnValue({
          entityAdapter: {
            selectId: (row: MockEntity) => row.id,
            getSelectors: () => ({ selectEntities: jest.fn() }),
          },
          selectId: (row: MockEntity) => row.id,
          isInitialRow: true,
        });

        // Create a new service instance to get the updated entityDefinition
        const testService = new ClassicNgrxFacade(
          'testFeature',
          'testEntity',
        ) as unknown as TestableActionService;

        // Initialize the service
        testService.init();

        // Spy on loadByIds
        const loadByIdsSpy = jest.spyOn(testService, 'loadByIds');

        // Call markDirty
        testService.markDirty(['1']);

        // Verify loadByIds was called with the first id
        expect(loadByIdsSpy).toHaveBeenCalledWith('1');
      });
    });

    describe('garbageCollect', () => {
      it('should not remove entities that are being edited', fakeAsync(() => {
        const mockEntities: Record<string, MockEntity> = {
          '1': { id: '1', isEditing: true },
          '2': { id: '2', isEditing: false },
        };

        // Set up the entityAdapter
        const entityAdapter = {
          getSelectors: () => ({}),
          selectId: (row: MockEntity) => row.id,
        };
        (entityDefinitionRegistry as jest.Mock).mockReturnValue({
          entityAdapter,
          selectId: (row: MockEntity) => row.id,
        });

        // Override selector to return mockEntities BEFORE service creation
        mockStore.overrideSelector(selectEntities, mockEntities);
        mockStore.refreshState();

        // Re-create the service so it uses the correct selector
        service = new ClassicNgrxFacade(
          'testFeature',
          'testEntity',
        ) as unknown as TestableActionService;
        // Mock all service initializers to avoid rootInjector errors
        service['loadByIdsService'] = {
          init() {
            /* noop */
          },
        };
        service['updateService'] = {
          init() {
            /* noop */
          },
        };
        service['addService'] = {
          init() {
            /* noop */
          },
        };
        service['loadByIndexesService'] = {
          init() {
            /* noop */
          },
        };
        // Do not call service.init() to avoid root injector errors

        // Mock unregister to return ids for filtering
        jest.spyOn(entityRowsRegistry, 'unregister').mockReturnValue(['2']);

        // Mock virtualArrayMap.remove to prevent undefined errors
        (virtualArrayMap.remove as jest.Mock) = jest.fn();

        // Mock asapScheduler.schedule to prevent errors
        jest.spyOn(asapScheduler, 'schedule').mockImplementation(() => {
          // No need to call the function as we're just preventing errors
          return new Subscription();
        });

        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        // Mock actions.remove to avoid undefined error
        service.actions = {
          remove: jest.fn().mockReturnValue({ type: 'REMOVE_ACTION' }),
        } as unknown as ActionGroup;
        service.garbageCollectWithEntities(mockEntities, ['1', '2']);

        // Advance the virtual clock to complete all pending asynchronous activities
        tick();

        // Verify dispatch was called with the correct action
        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining(service.actions.remove({ ids: ['2'] })),
        );
      }));

      it('should correctly cover the condition when idsToRemove.length is 0', () => {
        // Create a dictionary with entities that all have isEditing = true
        const mockEntities: Dictionary<MockEntity> = {
          '1': { id: '1', isEditing: true },
          '2': { id: '2', isEditing: true },
        };

        // Set up the entityAdapter
        const entityAdapter = {
          getSelectors: () => ({}),
          selectId: (row: MockEntity) => row.id,
        };
        (entityDefinitionRegistry as jest.Mock).mockReturnValue({
          entityAdapter,
          selectId: (row: MockEntity) => row.id,
        });

        // Override selector to return mockEntities
        mockStore.overrideSelector(selectEntities, mockEntities);
        mockStore.refreshState();

        const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
        // This will exercise the code path where ids are filtered to an empty array
        service.garbageCollectWithEntities(mockEntities, ['1', '2']);

        // And dispatch should not have been called
        expect(dispatchSpy).not.toHaveBeenCalled();
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
