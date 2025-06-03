import { InjectionToken } from '@angular/core';
import {
  EffectService,
  entityDefinitionRegistry,
  entityRegistry,
  facadeRegistry,
  featureRegistry,
  MarkAndDeleteInit,
  serviceRegistry,
} from '@smarttools/smart-core';

import { ClassicNgrxFacade } from '../classic-ngrx.facade/classic-ngrx.facade';
import { createStore } from '../tests/functions/create-store.function';
import { setState } from '../tests/functions/set-state.function';
import { updateEntity } from './update-entity.function';

const feature = 'testFeature';
const entity = 'testEntity';

describe('updateEntity', () => {
  let actionService: ClassicNgrxFacade | null = null;
  let actionServiceForceDirtySpy: jest.SpyInstance;
  let mockEffectService: jest.Mocked<EffectService<{ id: string }>>;

  beforeEach(() => {
    // Create and register mock effect service
    mockEffectService = {
      loadByIds: jest.fn(),
      loadByIndexes: jest.fn(),
    } as unknown as jest.Mocked<EffectService<{ id: string }>>;

    const effectServiceToken = new InjectionToken<
      EffectService<{ id: string }>
    >(entity + 'Service');
    serviceRegistry.register(effectServiceToken, mockEffectService);

    createStore();
    setState(feature, entity, {
      ids: [],
      entities: {},
    });

    // Unregister first to avoid "Entity already registered" error
    entityRegistry.unregister(feature, entity);

    entityDefinitionRegistry(feature, entity, {
      entityName: entity,
      effectServiceToken,
      defaultRow: () => ({ id: '1' }),
    });

    entityRegistry.register(feature, entity, {
      defaultRow: () => ({ id: '1' }),
      markAndDeleteInit: {} as MarkAndDeleteInit,
      markAndDeleteEntityMap: new Map(),
    });

    featureRegistry.registerFeature(feature);
    facadeRegistry.register(feature, entity, ClassicNgrxFacade);
    actionService = facadeRegistry.register(
      feature,
      entity,
    ) as ClassicNgrxFacade;
    actionServiceForceDirtySpy = jest.spyOn(actionService, 'forceDirty');
  });

  afterEach(() => {
    actionServiceForceDirtySpy.mockRestore();
    entityRegistry.unregister(feature, entity);
  });

  it('should update entities', () => {
    const ids = ['1', '2'];
    const state = {
      ids: ['1', '2', '3'],
      entities: {
        '1': { id: '1', name: 'Entity 1' },
        '2': { id: '2', name: 'Entity 2' },
        '3': { id: '3', name: 'Entity 3' },
      },
    };
    setState(feature, entity, state);

    updateEntity(feature, entity, ids);

    expect(actionServiceForceDirtySpy).toHaveBeenCalledTimes(2);
    expect(actionServiceForceDirtySpy).toHaveBeenCalledWith(['1']);
    expect(actionServiceForceDirtySpy).toHaveBeenCalledWith(['2']);
  });

  it('should not update entities if id does not exist in state', () => {
    const ids = ['4'];
    const state = {
      ids: ['1', '2', '3'],
      entities: {
        '1': { id: '1', name: 'Entity 1' },
        '2': { id: '2', name: 'Entity 2' },
        '3': { id: '3', name: 'Entity 3' },
      },
    };
    setState(feature, entity, state);

    updateEntity(feature, entity, ids);

    expect(actionServiceForceDirtySpy).not.toHaveBeenCalled();
  });
  it('should call forceDirty for ids that exist in the state', () => {
    const state = {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1' },
        '2': { id: '2' },
      },
    };
    setState(feature, entity, state);

    updateEntity(feature, entity, ['1', '2']);

    expect(actionServiceForceDirtySpy).toHaveBeenCalledTimes(2);
    expect(actionServiceForceDirtySpy).toHaveBeenCalledWith(['1']);
    expect(actionServiceForceDirtySpy).toHaveBeenCalledWith(['2']);
  });

  it('should not call forceDirty for ids that do not exist in the state', () => {
    const state = {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1' },
        '2': { id: '2' },
      },
    };

    setState(feature, entity, state);

    updateEntity(feature, entity, ['3']);

    expect(actionServiceForceDirtySpy).not.toHaveBeenCalled();
  });

  it('should not call forceDirty if the feature and/or entity do not exist in the state', () => {
    const state = {};
    setState(feature, entity, state);

    expect(() => updateEntity('other', entity, ['1', '2'])).toThrow();
  });
  it('should not update entities if the feature is not available', () => {
    const hasFeatureSpy = jest
      .spyOn(featureRegistry, 'hasFeature')
      .mockReturnValue(false);
    const ids = ['1', '2'];
    const state = {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1', name: 'Entity 1' },
        '2': { id: '2', name: 'Entity 2' },
      },
    };
    setState(feature, entity, state);

    updateEntity(feature, entity, ids);

    expect(hasFeatureSpy).toHaveBeenCalledWith(feature);
    expect(actionServiceForceDirtySpy).not.toHaveBeenCalled();

    hasFeatureSpy.mockRestore();
  });

  it('should call loadByIds when markDirtyFetchesNew is true and entity exists', () => {
    const loadByIdsSpy = jest.spyOn(actionService!, 'loadByIds');
    const state = {
      ids: ['1'],
      entities: {
        '1': { id: '1' },
      },
    };
    setState(feature, entity, state);

    // Ensure markDirtyFetchesNew is true
    const registry = entityRegistry.get(feature, entity);
    registry.markAndDeleteInit.markDirtyFetchesNew = true;

    updateEntity(feature, entity, ['1']);

    expect(loadByIdsSpy).toHaveBeenCalledWith('1');
    expect(actionServiceForceDirtySpy).toHaveBeenCalledWith(['1']);

    loadByIdsSpy.mockRestore();
  });

  it('should not call loadByIds when markDirtyFetchesNew is false', () => {
    const loadByIdsSpy = jest.spyOn(actionService!, 'loadByIds');
    const state = {
      ids: ['1'],
      entities: {
        '1': { id: '1' },
      },
    };
    setState(feature, entity, state);

    // Set markDirtyFetchesNew to false
    const registry = entityRegistry.get(feature, entity);
    registry.markAndDeleteInit.markDirtyFetchesNew = false;

    updateEntity(feature, entity, ['1']);

    expect(loadByIdsSpy).not.toHaveBeenCalled();
    expect(actionServiceForceDirtySpy).toHaveBeenCalledWith(['1']);

    loadByIdsSpy.mockRestore();
  });

  it('should not call loadByIds when markDirtyFetchesNew is undefined', () => {
    const loadByIdsSpy = jest.spyOn(actionService!, 'loadByIds');
    const state = {
      ids: ['1'],
      entities: {
        '1': { id: '1' },
      },
    };
    setState(feature, entity, state);

    // Set markDirtyFetchesNew to undefined
    const registry = entityRegistry.get(feature, entity);
    // @ts-expect-error - we want to test the case where markDirtyFetchesNew is undefined
    registry.markAndDeleteInit.markDirtyFetchesNew = undefined;

    updateEntity(feature, entity, ['1']);

    expect(loadByIdsSpy).not.toHaveBeenCalled();
    expect(actionServiceForceDirtySpy).toHaveBeenCalledWith(['1']);

    loadByIdsSpy.mockRestore();
  });
});
