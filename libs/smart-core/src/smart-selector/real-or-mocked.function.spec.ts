import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { provideMockStore } from '@ngrx/store/testing';

import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { serviceRegistry } from '../registrations/service-registry.class';
import { BaseChildDefinition } from '../types/base-child-definition.interface';
import { EffectService } from '../types/effect-service';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { realOrMocked } from './real-or-mocked.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { FacadeBase } from '../facades/facade.base';
import { UpdateStr } from '@ngrx/entity/src/models';
import { ParentInfo } from '../types/parent-info.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { facadeRegistry } from '../registrations/facade-registry.class';

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

class MockFacade<T extends SmartNgRXRowBase> extends FacadeBase<T> {
  override markDirty(ids: string[]): void {
    throw new Error('markDirty Method not implemented.');
  }

  override markNotDirty(id: string): void {
    throw new Error('markNotDirty Method not implemented.');
  }

  override forceDirty(ids: string[]): void {
    throw new Error('forceDirty Method not implemented.');
  }

  override garbageCollect(ids: string[]): void {
    throw new Error('garbageCollect Method not implemented.');
  }

  override remove(ids: string[]): void {
    throw new Error('remove Method not implemented.');
  }

  override update(oldRow: SmartNgRXRowBase, newRow: SmartNgRXRowBase): void {
    throw new Error('update update Method not implemented.');
  }

  override updateMany(changes: UpdateStr<SmartNgRXRowBase>[]): void {
    throw new Error('updateMany Method not implemented.');
  }

  override loadByIds(ids: string): void {
    throw new Error('loadByIds Method not implemented.');
  }

  override loadByIdsPreload(ids: string[]): void {
    throw new Error('loadByIdsPreload Method not implemented.');
  }

  override loadByIdsSuccess(rows: SmartNgRXRowBase[]): void {
    throw new Error('loadByIdsSuccess Method not implemented.');
  }

  override loadByIndexes(
    parentId: string,
    childField: string,
    index: number,
  ): void {
    throw new Error('loadByIndexes Method not implemented.');
  }

  override loadByIndexesSuccess(
    parentId: string,
    childField: string,
    array: PartialArrayDefinition,
  ): void {
    throw new Error('loadByIndexesSuccess Method not implemented.');
  }

  override upsertRow(row: T): void {
    throw new Error('upsertRow Method not implemented.');
  }

  override removeFromParents(id: string): ParentInfo[] {
    throw new Error('removeFromParents Method not implemented.');
  }

  override init(): boolean {
    return true;
  }
}

describe('realOrMocked', () => {
  const childDefinition = {
    childFeature: 'feature',
    childEntity: 'entity',
    parentFeature: 'parentFeature',
    parentEntity: 'parentEntity',
  } as unknown as BaseChildDefinition;

  let mockEffectService: jest.Mocked<EffectService<typeof defaultObject>>;

  beforeEach(() => {
    facadeRegistry.register('feature', 'entity', MockFacade);
    facadeRegistry.register('parentFeature', 'parentEntity', MockFacade);
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
