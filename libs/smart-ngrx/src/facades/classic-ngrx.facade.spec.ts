import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import * as storeFunction from '../smart-selector/store.function';
import { ActionGroup } from '../types/action-group.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ClassicNgrxFacade } from './classic-ngrx.facade';
import * as actionFactory from './classic-ngrx.facade/action.factory';
import * as watchInitialRowModule from './classic-ngrx.facade/watch-initial-row.function';

jest.mock('../registrations/feature-registry.class');
jest.mock('../registrations/entity-definition-registry.function');
jest.mock('../registrations/entity-registry.class');
jest.mock('./classic-ngrx.facade/action.factory');
jest.mock('../smart-selector/store.function');

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
    | 'markDirtyFetchesNew'
    | 'optimisticUpdate'
    | 'removeFromParents'
    | 'updateMany'
  > {
  markDirtyFetchesNew: boolean;
  forceDirty(ids: string[]): void;
  actions: ActionGroup;
  optimisticUpdate(oldRow: MockEntity, newRow: MockEntity): void;
  updateMany(updates: { id: string; changes: Partial<MockEntity> }[]): void;
  removeFromParents(id: string): string[];
}

describe('ActionService', () => {
  let service: TestableActionService;
  let mockStore: jest.Mocked<Store>;

  beforeEach(() => {
    mockStore = {
      select: jest.fn().mockReturnValue(of({})),
      dispatch: jest.fn(),
    } as unknown as jest.Mocked<Store>;

    (storeFunction.store as jest.Mock).mockReturnValue(mockStore);

    TestBed.configureTestingModule({
      providers: [ClassicNgrxFacade, { provide: Store, useValue: mockStore }],
    });

    service = new ClassicNgrxFacade(
      'testFeature',
      'testEntity',
    ) as unknown as TestableActionService;
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
        entityAdapter: { getSelectors: () => ({ selectEntities: jest.fn() }) },
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
        entityAdapter: { getSelectors: () => ({ selectEntities: jest.fn() }) },
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
        entityAdapter: { getSelectors: () => ({ selectEntities: jest.fn() }) },
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

      // Initialize the service
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

        // Mock the entityAdapter's selectEntities method
        const mockSelectEntities = jest
          .fn()
          .mockReturnValue(() => mockEntities);
        (entityDefinitionRegistry as jest.Mock).mockReturnValue({
          entityAdapter: {
            getSelectors: () => ({ selectEntities: mockSelectEntities }),
          },
        });
        // we need a new instance of the service so we can
        // rerun the init method to use our mocks.
        service = new ClassicNgrxFacade(
          'testFeature',
          'testEntity',
        ) as unknown as TestableActionService;
        // Reinitialize the service to use our new mocks
        service.init();

        service.garbageCollect(['1', '2']);

        // Advance the virtual clock to complete all pending asynchronous activities
        tick();

        // eslint-disable-next-line @typescript-eslint/unbound-method -- safe because it is a test
        expect(mockStore.dispatch).toHaveBeenCalledWith(
          expect.objectContaining(service.actions.remove({ ids: ['2'] })),
        );
      }));

      it('should not dispatch if no entities to remove', fakeAsync(() => {
        const mockEntities: Record<string, MockEntity> = {
          '1': { id: '1', isEditing: true },
        };
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- needed for testing
        mockStore.select.mockReturnValue(of(mockEntities));

        service.garbageCollect(['1']);

        // Advance the virtual clock
        tick();

        // eslint-disable-next-line @typescript-eslint/unbound-method -- safe because it is a test
        expect(mockStore.dispatch).not.toHaveBeenCalled();
      }));
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
