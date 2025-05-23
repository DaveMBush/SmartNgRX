/* eslint-disable sonarjs/no-duplicate-string -- conflicting rule */
import { InjectionToken } from '@angular/core';
import { createEntityAdapter } from '@ngrx/entity';
import { UpdateStr } from '@ngrx/entity/src/models';

import { FacadeBase } from '../facades/facade.base';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { serviceRegistry } from '../registrations/service-registry.class';
import { EffectService } from '../types/effect-service';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { ParentInfo } from '../types/parent-info.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ensureDataLoaded } from './ensure-data-loaded.function';

const feature = 'feature';
const entity = 'entity';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
}

class MockFacade<T extends SmartNgRXRowBase> extends FacadeBase<T> {
  override init(): boolean {
    return true;
  }

  override markDirty(_: string[]): void {
    throw new Error('markDirty Method not implemented.');
  }

  override markNotDirty(_: string): void {
    throw new Error('markNotDirty Method not implemented.');
  }

  override forceDirty(_: string[]): void {
    throw new Error('forceDirty Method not implemented.');
  }

  override garbageCollect(_: string[]): void {
    throw new Error('garbageCollect Method not implemented.');
  }

  override remove(_: string[]): void {
    throw new Error('remove Method not implemented.');
  }

  override update(_: SmartNgRXRowBase, __: SmartNgRXRowBase): void {
    throw new Error('update update Method not implemented.');
  }

  override updateMany(_: UpdateStr<SmartNgRXRowBase>[]): void {
    throw new Error('updateMany Method not implemented.');
  }

  override loadByIds(_: string): void {
    throw new Error('loadByIds Method not implemented.');
  }

  override loadByIdsPreload(_: string[]): void {
    throw new Error('loadByIdsPreload Method not implemented.');
  }

  override loadByIndexes(_: string, __: string, ___: number): void {
    throw new Error('loadByIndexes Method not implemented.');
  }

  override loadByIndexesSuccess(
    _: string,
    __: string,
    ___: PartialArrayDefinition,
  ): void {
    throw new Error('loadByIndexesSuccess Method not implemented.');
  }

  override upsertRow(_: T): void {
    throw new Error('upsertRow Method not implemented.');
  }

  override removeFromParents(_: string): ParentInfo[] {
    throw new Error('removeFromParents Method not implemented.');
  }

  override loadByIdsSuccess(_: SmartNgRXRowBase[]): void {
    return;
  }
}

describe('ensureDataLoaded()', () => {
  let actionServiceLoadByIdsSpy: jest.SpyInstance;
  let actionService: FacadeBase | null;
  let mockEffectService: jest.Mocked<EffectService<Row>>;

  beforeEach(() => {
    featureRegistry.registerFeature(feature);
    facadeRegistry.register(feature, entity, MockFacade);

    // Create and register mock effect service
    mockEffectService = {
      loadByIds: jest.fn(),
      loadByIndexes: jest.fn(),
    } as unknown as jest.Mocked<EffectService<Row>>;

    const effectServiceToken = new InjectionToken<EffectService<Row>>(
      'effectService',
    );
    serviceRegistry.register(effectServiceToken, mockEffectService);

    entityDefinitionRegistry(feature, entity, {
      entityAdapter: createEntityAdapter(),
      effectServiceToken,
    } as unknown as SmartEntityDefinition<SmartNgRXRowBase>);

    entityRegistry.register(feature, entity, {
      markAndDeleteInit: { markDirtyFetchesNew: true },
    } as EntityAttributes);

    actionService = facadeRegistry.register(feature, entity);
    actionServiceLoadByIdsSpy = jest.spyOn(actionService, 'loadByIds');
  });

  afterEach(() => {
    jest.clearAllMocks();
    entityRegistry.unregister(feature, entity);
  });

  describe('when the id is not loaded', () => {
    beforeEach(() => {
      ensureDataLoaded({ ids: [], entities: {} }, 'id', 'feature', 'entity');
    });
    it('should call the action service to load the id', () => {
      expect(actionServiceLoadByIdsSpy).toHaveBeenCalled();
    });
  });
  describe('when the id is loaded', () => {
    describe('but isDirty has never been set', () => {
      beforeEach(() => {
        ensureDataLoaded(
          {
            ids: [],
            entities: { id: { id: 'id', name: 'foo' } },
          },
          'id',
          'feature',
          'entity',
        );
      });
      it('should call the action service to load the id', () => {
        expect(actionServiceLoadByIdsSpy).toHaveBeenCalled();
      });
    });
    describe('and isDirty is true and mark dirty fetches new', () => {
      beforeEach(() => {
        ensureDataLoaded<Row>(
          {
            ids: [],
            entities: {
              id: { id: 'id', name: 'foo', isDirty: true },
            },
          },
          'id',
          'feature',
          'entity',
        );
      });
      it('should call the action service to load the id', () => {
        expect(actionServiceLoadByIdsSpy).toHaveBeenCalled();
      });
    });
    describe('and isDirty is true but mark dirty does not fetch new', () => {
      beforeEach(() => {
        entityRegistry.unregister(feature, entity);
        entityRegistry.register(feature, entity, {
          markAndDeleteInit: { markDirtyFetchesNew: false },
        } as EntityAttributes);

        ensureDataLoaded<Row>(
          {
            ids: [],
            entities: {
              id: { id: 'id', name: 'foo', isDirty: true },
            },
          },
          'id',
          'feature',
          'entity',
        );
      });
      it('should call the action service to load the id', () => {
        expect(actionServiceLoadByIdsSpy).toHaveBeenCalled();
      });
    });

    describe('and idsId is undefined', () => {
      beforeEach(() => {
        ensureDataLoaded<Row>(
          {
            ids: [],
            entities: {},
          },
          'id',
          'feature',
          'entity',
        );
      });
      it('should call the action service to load the id', () => {
        expect(actionServiceLoadByIdsSpy).toHaveBeenCalled();
      });
    });

    describe('and markDirtyFetchesNew is null', () => {
      beforeEach(() => {
        entityRegistry.unregister(feature, entity);
        entityRegistry.register(feature, entity, {
          markAndDeleteInit: {
            markDirtyFetchesNew: false,
            markDirtyTime: 1000,
            removeTime: 2000,
            runInterval: 1000,
          },
          defaultRow: (id: string) => ({ id, name: '' }),
          markAndDeleteEntityMap: new Map<string, number>(),
        } as EntityAttributes);

        ensureDataLoaded<Row>(
          {
            ids: [],
            entities: {
              id: { id: 'id', name: 'foo', isDirty: true },
            },
          },
          'id',
          'feature',
          'entity',
        );
      });
      it('should call the action service to load the id', () => {
        expect(actionServiceLoadByIdsSpy).toHaveBeenCalled();
      });
    });

    describe('and markDirtyFetchesNew is undefined', () => {
      beforeEach(() => {
        entityRegistry.unregister(feature, entity);
        entityRegistry.register(feature, entity, {
          markAndDeleteInit: {
            markDirtyFetchesNew: false,
            markDirtyTime: 1000,
            removeTime: 2000,
            runInterval: 1000,
          },
          defaultRow: (id: string) => ({ id, name: '' }),
          markAndDeleteEntityMap: new Map<string, number>(),
        } as EntityAttributes);

        ensureDataLoaded<Row>(
          {
            ids: [],
            entities: {
              id: { id: 'id', name: 'foo', isDirty: true },
            },
          },
          'id',
          'feature',
          'entity',
        );
      });
      it('should call the action service to load the id', () => {
        expect(actionServiceLoadByIdsSpy).toHaveBeenCalled();
      });
    });

    describe('and markDirtyFetchesNew is false', () => {
      beforeEach(() => {
        entityRegistry.unregister(feature, entity);
        entityRegistry.register(feature, entity, {
          markAndDeleteInit: {
            markDirtyFetchesNew: false,
            markDirtyTime: 1000,
            removeTime: 2000,
            runInterval: 1000,
          },
          defaultRow: (id: string) => ({ id, name: '' }),
          markAndDeleteEntityMap: new Map<string, number>(),
        } as EntityAttributes);

        ensureDataLoaded<Row>(
          {
            ids: [],
            entities: {
              id: { id: 'id', name: 'foo', isDirty: true },
            },
          },
          'id',
          'feature',
          'entity',
        );
      });
      it('should call the action service to load the id', () => {
        expect(actionServiceLoadByIdsSpy).toHaveBeenCalled();
      });
    });
  });
});
