import { EntityAdapter } from '@ngrx/entity';
import * as createEntityAdapterObject from '@ngrx/entity';

import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { EffectServiceToken } from '../types/effect-service.token';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
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
    effectServiceToken: null as unknown as EffectServiceToken<SmartNgRXRowBase>,
    defaultRow: () => ({
      id: '1',
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
  describe('when entityDefinitions does not have an entityAdapter', () => {
    it('should call createEntityAdapter', () => {
      entityDefinitionRegistry(featureName, entityName, definition);
      expect(createEntityAdapterSpy).toHaveBeenCalledTimes(1);
    });
  });
});
