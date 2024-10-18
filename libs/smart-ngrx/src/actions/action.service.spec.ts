import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { childDefinitionRegistry } from '../registrations/child-definition.registry';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { featureRegistry } from '../registrations/feature-registry.class';
import { getEntityRegistry } from '../registrations/register-entity.function';
import * as storeFunction from '../selector/store.function';
import * as actionFactory from './action.factory';
import { ActionService } from './action.service';
import { ActionGroup } from './action-group.interface';

jest.mock('../registrations/feature-registry.class');
jest.mock('../registrations/entity-definition-cache.function');
jest.mock('../registrations/register-entity.function');
jest.mock('./action.factory');
jest.mock('../selector/store.function');

interface MockEntity {
  id: string;
  isEditing?: boolean;
}

interface TestableActionService
  extends Omit<ActionService, 'actions' | 'forceDirty' | 'markDirtyFetchesNew'> {
  markDirtyFetchesNew: boolean;
  forceDirty(ids: string[]): void;
  actions: ActionGroup;
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
      providers: [ActionService, { provide: Store, useValue: mockStore }],
    });

    service = new ActionService(
      'testFeature',
      'testEntity',
    ) as unknown as TestableActionService;
  });

  describe('init', () => {
    it('should return false if feature is not registered', () => {
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(false);
      expect(service.init()).toBeFalsy();
    });

    it('should initialize successfully if feature is registered', () => {
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({});
      (entityDefinitionCache as jest.Mock).mockReturnValue({
        entityAdapter: { getSelectors: () => ({ selectEntities: jest.fn() }) },
      });
      (getEntityRegistry as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      expect(service.init()).toBeTruthy();
    });
  });

  describe('after initialization', () => {
    beforeEach(() => {
      // Set up mocks for successful initialization
      (featureRegistry.hasFeature as jest.Mock).mockReturnValue(true);
      (actionFactory.actionFactory as jest.Mock).mockReturnValue({
        remove: jest.fn().mockReturnValue({ type: 'REMOVE_ACTION' }),
      });
      (entityDefinitionCache as jest.Mock).mockReturnValue({
        entityAdapter: { getSelectors: () => ({ selectEntities: jest.fn() }) },
      });
      (getEntityRegistry as jest.Mock).mockReturnValue({
        markAndDeleteInit: {},
      });

      // Initialize the service
      service.init();
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
        // eslint-disable-next-line deprecation/deprecation -- needed for testing
        mockStore.select.mockReturnValue(of(mockEntities));

        // Mock the entityAdapter's selectEntities method
        const mockSelectEntities = jest
          .fn()
          .mockReturnValue(() => mockEntities);
        (entityDefinitionCache as jest.Mock).mockReturnValue({
          entityAdapter: {
            getSelectors: () => ({ selectEntities: mockSelectEntities }),
          },
        });

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
        // eslint-disable-next-line deprecation/deprecation -- needed for testing
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
      jest.spyOn(childDefinitionRegistry, 'getChildDefinition').mockReturnValue([]);

      const result = service.removeFromParents('1');

      expect(result).toEqual([]);
    });
  });
});
