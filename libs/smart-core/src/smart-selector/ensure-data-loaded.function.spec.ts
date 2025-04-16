/* eslint-disable sonarjs/no-duplicate-string -- conflicting rule */
import { InjectionToken } from '@angular/core';
import { createEntityAdapter } from '@ngrx/entity';

import { FacadeBase } from '../facades/facade.base';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { entityRowsRegistry } from '../registrations/entity-rows-registry.class';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { serviceRegistry } from '../registrations/service-registry.class';
import { EffectService } from '../types/effect-service';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ensureDataLoaded } from './ensure-data-loaded.function';
import { UpdateStr } from '@ngrx/entity/src/models';
import { ParentInfo } from '../types/parent-info.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';

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

  override loadByIndexes(parentId: string, childField: string, index: number): void {
    throw new Error('loadByIndexes Method not implemented.');
  }

  override loadByIndexesSuccess(parentId: string, childField: string, array: PartialArrayDefinition): void {
    throw new Error('loadByIndexesSuccess Method not implemented.');
  }

  override upsertRow(row: T): void {
    throw new Error('upsertRow Method not implemented.');
  }

  override removeFromParents(id: string): ParentInfo[] {
    throw new Error('removeFromParents Method not implemented.');
  }

  override loadByIdsSuccess(): void {
    return;
  }
}

describe('ensureDataLoaded()', () => {
  let actionServiceLoadByIdsSpy: jest.SpyInstance;
  let actionServiceMarkNotDirtySpy: jest.SpyInstance;
  let entityRowsRegistrySpy: jest.SpyInstance;
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
    actionServiceMarkNotDirtySpy = jest.spyOn(actionService, 'markNotDirty');
    entityRowsRegistrySpy = jest.spyOn(entityRowsRegistry, 'register');
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
        // have to unregister and re-register so we can set markDirtyFetchesNew
        // and because we already registered in the parent beforeEach
        entityRegistry.unregister(feature, entity);
        entityRegistry.register(feature, entity, {
          markAndDeleteInit: { markDirtyFetchesNew: false },
        } as EntityAttributes);

        const row = { id: 'id', name: 'foo', isDirty: true };
        ensureDataLoaded<Row>(
          {
            ids: [],
            entities: { id: row },
          },
          'id',
          'feature',
          'entity',
        );
      });

      it('should register the entity row', () => {
        expect(entityRowsRegistrySpy).toHaveBeenCalledWith(
          'feature',
          'entity',
          [{ id: 'id', name: 'foo', isDirty: true }],
        );
      });

      it('should mark the entity as not dirty', () => {
        expect(actionServiceMarkNotDirtySpy).toHaveBeenCalledWith('id');
      });

      it('should not call loadByIds', () => {
        expect(actionServiceLoadByIdsSpy).not.toHaveBeenCalled();
      });
    });
  });
});
