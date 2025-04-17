import { InjectionToken } from '@angular/core';
import {
  EffectService,
  entityDefinitionRegistry,
  entityRegistry,
  FacadeBase,
  facadeRegistry,
  featureRegistry,
  MarkAndDeleteInit,
  serviceRegistry,
  SmartNgRXRowBase,
} from '@smarttools/core';

import { SignalsFacade } from '../facades/signals-facade';
import { updateEntity } from './update-entity.function';

const feature = 'testFeature';
const entity = 'testEntity';

interface TestEntity extends SmartNgRXRowBase {
  id: string;
  name: string;
}

describe('updateEntity', () => {
  let actionService: unknown;
  let typedActionService: FacadeBase<TestEntity>;
  let actionServiceForceDirtySpy: jest.SpyInstance;
  let mockEffectService: jest.Mocked<EffectService<TestEntity>>;
  let mockRegisterSpy: jest.SpyInstance;
  let fakeFacade: SignalsFacade<TestEntity>;

  beforeEach(() => {
    // Create a mock facade that we can control
    fakeFacade = {
      init: jest.fn(),
      entityState: {
        entityMap: jest.fn().mockReturnValue({
          '1': { id: '1', name: 'Entity 1' },
          '2': { id: '2', name: 'Entity 2' },
          '3': { id: '3', name: 'Entity 3' },
        }),
      },
    } as unknown as SignalsFacade<TestEntity>;

    // Register the facade
    facadeRegistry.register(feature, entity, SignalsFacade);

    // Create and register mock effect service
    mockEffectService = {
      loadByIds: jest.fn(),
      loadByIndexes: jest.fn(),
    } as unknown as jest.Mocked<EffectService<TestEntity>>;

    const effectServiceToken = new InjectionToken<EffectService<TestEntity>>(
      entity + 'Service',
    );
    serviceRegistry.register(effectServiceToken, mockEffectService);

    // Unregister first to avoid "Entity already registered" error
    entityRegistry.unregister(feature, entity);

    entityDefinitionRegistry(feature, entity, {
      entityName: entity,
      effectServiceToken,
      defaultRow: () => ({ id: '1', name: '' }),
    });

    entityRegistry.register(feature, entity, {
      defaultRow: () => ({ id: '1', name: '' }),
      markAndDeleteInit: {} as MarkAndDeleteInit,
      markAndDeleteEntityMap: new Map(),
    });

    featureRegistry.registerFeature(feature);
    actionService = facadeRegistry.register(feature, entity);
    typedActionService = actionService as FacadeBase<TestEntity>;
    actionServiceForceDirtySpy = jest.spyOn(typedActionService, 'forceDirty');

    // Set up common mocks
    mockRegisterSpy = jest.spyOn(facadeRegistry, 'register');
  });

  afterEach(() => {
    actionServiceForceDirtySpy.mockRestore();
    entityRegistry.unregister(feature, entity);
    jest.restoreAllMocks();
  });

  it('should not update entities if id does not exist in state', () => {
    const ids = ['4'];

    // Reset mocks with appropriate return values for this test
    mockRegisterSpy.mockReturnValue(actionService);

    // Mock the second facadeRegistry.register call to return our fake facade
    mockRegisterSpy
      .mockReturnValueOnce(actionService)
      .mockReturnValueOnce(fakeFacade);

    updateEntity(feature, entity, ids);

    expect(actionServiceForceDirtySpy).not.toHaveBeenCalled();
  });

  it('should not call forceDirty for ids that do not exist in the state', () => {
    updateEntity(feature, entity, ['3']);

    expect(actionServiceForceDirtySpy).not.toHaveBeenCalled();
  });

  it('should not call forceDirty if the feature and/or entity do not exist in the state', () => {
    expect(() => updateEntity('other', entity, ['1', '2'])).toThrow();
  });

  it('should not update entities if the feature is not available', () => {
    const hasFeatureSpy = jest
      .spyOn(featureRegistry, 'hasFeature')
      .mockReturnValue(false);
    const ids = ['1', '2'];

    updateEntity(feature, entity, ids);

    expect(hasFeatureSpy).toHaveBeenCalledWith(feature);
    expect(actionServiceForceDirtySpy).not.toHaveBeenCalled();

    hasFeatureSpy.mockRestore();
  });

  it('should call forceDirty for ids that exist in the state', () => {
    const existingIds = ['1', '2'];

    // Create a special entity map for this test with only the IDs we want to test
    const specialFakeFacade = {
      init: jest.fn(),
      entityState: {
        entityMap: jest.fn().mockReturnValue({
          '1': { id: '1', name: 'Entity 1' },
          '2': { id: '2', name: 'Entity 2' },
        }),
      },
    } as unknown as SignalsFacade<TestEntity>;

    // Reset mocks with appropriate return values
    mockRegisterSpy
      .mockReturnValueOnce(actionService)
      .mockReturnValueOnce(specialFakeFacade);

    updateEntity(feature, entity, existingIds);

    expect(actionServiceForceDirtySpy)
      .toHaveBeenNthCalledWith(1, ['1']);
    expect(actionServiceForceDirtySpy)
      .toHaveBeenNthCalledWith(2, ['2']);
  });
});
