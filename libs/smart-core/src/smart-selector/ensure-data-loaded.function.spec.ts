/* eslint-disable sonarjs/no-duplicate-string -- conflicting rule */
import { InjectionToken } from '@angular/core';
import { createEntityAdapter } from '@ngrx/entity';

import { FacadeBase } from '../facades/facade.base';
import { entityRowsRegistry } from '../registrations/entity-rows-registry.class';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { serviceRegistry } from '../registrations/service-registry.class';
import { createStore } from '../../../smart-ngrx/src/tests/functions/create-store.function';
import { setState } from '../../../smart-ngrx/src/tests/functions/set-state.function';
import { EffectService } from '../types/effect-service';
import { EntityAttributes } from '../../../smart-ngrx/src/types/entity-attributes.interface';
import { SmartEntityDefinition } from '../../../smart-ngrx/src/types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ensureDataLoaded } from '../../../smart-ngrx/src/smart-selector/ensure-data-loaded.function';

const feature = 'feature';
const entity = 'entity';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
}

describe('ensureDataLoaded()', () => {
  let actionServiceLoadByIdsSpy: jest.SpyInstance;
  let actionServiceMarkNotDirtySpy: jest.SpyInstance;
  let entityRowsRegistrySpy: jest.SpyInstance;
  let actionService: FacadeBase | null;
  let mockEffectService: jest.Mocked<EffectService<Row>>;

  beforeEach(() => {
    createStore();
    featureRegistry.registerFeature(feature);

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

    // setup the store so the feature exist and we can retrieve the action service
    createStore();
    setState(feature, entity, {
      ids: [],
      entities: {},
    });
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
