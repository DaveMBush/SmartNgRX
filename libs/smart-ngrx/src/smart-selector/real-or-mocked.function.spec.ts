import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { InjectionToken } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { createStore } from '../tests/functions/create-store.function';
import { setState } from '../tests/functions/set-state.function';
import { serviceRegistry } from '../registrations/service-registry.class';
import { EffectService } from '../types/effect-service';
import { ChildDefinition } from '../types/child-definition.interface';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { realOrMocked } from './real-or-mocked.function';

const real = {
  ids: ['department1'],
  entities: {
    department1: {
      id: 'department1',
      name: 'Department 1',
    },
  },
};

const defaultObject = {
  id: 'department2',
  name: 'to be fetched',
};

describe('realOrMocked', () => {
  const childDefinition = {
    childFeature: 'feature',
    childEntity: 'entity',
    parentFeature: 'parentFeature',
    parentEntity: 'parentEntity',
  } as unknown as ChildDefinition<
    SmartNgRXRowBase,
    { id: string; name: string }
  >;

  let mockEffectService: jest.Mocked<EffectService<typeof defaultObject>>;

  beforeEach(() => {
    // Create and register mock effect service
    mockEffectService = {
      loadByIds: jest.fn(),
      loadByIndexes: jest.fn(),
    } as unknown as jest.Mocked<EffectService<typeof defaultObject>>;

    const effectServiceToken = new InjectionToken<
      EffectService<typeof defaultObject>
    >('effectService');
    serviceRegistry.register(effectServiceToken, mockEffectService);

    entityDefinitionRegistry('feature', 'entity', {
      entityName: 'entity',
      entityAdapter: createEntityAdapter(),
      defaultRow: (id: string) => ({ name: '', id }),
      effectServiceToken,
    } as unknown as SmartEntityDefinition<typeof defaultObject>);

    entityDefinitionRegistry('parentFeature', 'parentEntity', {
      entityName: 'parentEntity',
      entityAdapter: createEntityAdapter(),
      defaultRow: (id: string) => ({ name: '', id }),
      effectServiceToken,
    } as unknown as SmartEntityDefinition<typeof defaultObject>);

    featureRegistry.registerFeature('feature');
    featureRegistry.registerFeature('parentFeature');
    entityRegistry.register('feature', 'entity', {
      markAndDeleteInit: {},
    } as EntityAttributes);
    entityRegistry.register('parentFeature', 'parentEntity', {
      markAndDeleteInit: {},
    } as EntityAttributes);
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: {} })],
    });
    createStore();
    setState('feature', 'entity', {
      ids: [],
      entities: {},
    });
    setState('parentFeature', 'parentEntity', {
      ids: [],
      entities: {},
    });
  });

  afterEach(() => {
    entityRegistry.unregister('feature', 'entity');
    entityRegistry.unregister('parentFeature', 'parentEntity');
  });

  it('returns the real value if available', () => {
    const r = realOrMocked(real, 'department1', defaultObject, childDefinition);

    expect(JSON.parse(JSON.stringify(r))).toEqual({
      id: 'department1',
      name: 'Department 1',
    });
  });

  it('returns the mocked value if real one is not available', () => {
    const r = realOrMocked(real, 'department2', defaultObject, childDefinition);

    expect(JSON.parse(JSON.stringify(r))).toEqual({
      id: 'department2',
      name: 'to be fetched',
      isLoading: true,
    });
  });
});
