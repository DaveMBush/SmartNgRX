import { InjectionToken } from '@angular/core';

import { ActionService } from '../actions/action.service';
import { actionServiceRegistry } from '../registrations/action-service-registry.class';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { createStore } from '../tests/functions/create-store.function';
import { setState } from '../tests/functions/set-state.function';
import { MarkAndDeleteInit } from '../types/mark-and-delete-init.interface';
import { updateEntity } from './update-entity.function';

const feature = 'testFeature';
const entity = 'testEntity';

describe('updateEntity', () => {
  let actionService: ActionService | null = null;
  let actionServiceForceDirtySpy: jest.SpyInstance;
  beforeEach(() => {
    createStore();
    setState(feature, entity, {
      ids: [],
      entities: {},
    });
    entityDefinitionRegistry(feature, entity, {
      entityName: entity,
      effectServiceToken: new InjectionToken(entity + 'Service'),
      defaultRow: () => ({ id: '1' }),
    });
    entityRegistry.register(feature, entity, {
      defaultRow: () => ({ id: '1' }),
      markAndDeleteInit: {} as MarkAndDeleteInit,
      markAndDeleteEntityMap: new Map(),
    });
    featureRegistry.registerFeature(feature);
    actionService = actionServiceRegistry.register(feature, entity);
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
});
