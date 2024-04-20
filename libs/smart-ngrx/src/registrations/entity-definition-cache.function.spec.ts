import { EntityAdapter } from '@ngrx/entity';
import * as createEntityAdapterObject from '@ngrx/entity';

import { EffectServiceToken } from '../types/effect-service.token';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { entityDefinitionCache } from './entity-definition-cache.function';

jest.mock('@ngrx/entity', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@ngrx/entity'),
    createEntityAdapter: jest.fn(),
  } as typeof import('@ngrx/entity');
});

describe('provideSmartFeatureEntities', () => {
  let createEntityAdapterSpy: jest.SpyInstance;
  const featureName = 'featureName';
  const entityName = 'entityName';
  const definition: SmartEntityDefinition<SmartNgRXRowBase & { id: string }> = {
    entityName,
    entityAdapter: {} as unknown as EntityAdapter<SmartNgRXRowBase>,
    effectServiceToken: null as unknown as EffectServiceToken<SmartNgRXRowBase>,
    defaultRow: () => ({
      id: '1',
      isDirty: false,
      isLoading: false,
      isEditing: false,
    }),
  };
  beforeEach(() => {
    createEntityAdapterSpy = jest
      .spyOn(createEntityAdapterObject, 'createEntityAdapter')
      .mockImplementation(
        () =>
          ({
            addAll: jest.fn(),
            addMany: jest.fn(),
            addOne: jest.fn(),
            getInitialState: jest.fn(),
            removeAll: jest.fn(),
            removeMany: jest.fn(),
            removeOne: jest.fn(),
            selectAll: jest.fn(),
            selectIds: jest.fn(),
            selectTotal: jest.fn(),
            updateMany: jest.fn(),
            updateOne: jest.fn(),
          }) as unknown as EntityAdapter<unknown>,
      );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when entityDefinitions has an entityAdapter', () => {
    it('should not call createEntityAdapter', () => {
      entityDefinitionCache(featureName, entityName, definition);
      expect(createEntityAdapterSpy).not.toHaveBeenCalled();
    });
  });
  describe('when entityDefinitions does not have an entityAdapter', () => {
    beforeEach(() => {
      delete definition.entityAdapter;
    });
    it('should call createEntityAdapter', () => {
      entityDefinitionCache(featureName, entityName, definition);
      expect(createEntityAdapterSpy).toHaveBeenCalledTimes(1);
    });
  });
});
