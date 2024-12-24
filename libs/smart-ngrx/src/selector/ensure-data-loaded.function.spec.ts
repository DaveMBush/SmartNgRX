/* eslint-disable sonarjs/no-duplicate-string -- conflicting rule */
import { createEntityAdapter } from '@ngrx/entity';

import { ActionService } from '../actions/action.service';
import { actionServiceRegistry } from '../registrations/action-service-registry.class';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { entityRegistry } from '../registrations/entity-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { createStore } from '../tests/functions/create-store.function';
import { setState } from '../tests/functions/set-state.function';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ensureDataLoaded } from './ensure-data-loaded.function';

const feature = 'feature';
const entity = 'entity';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
}

describe('ensureDataLoaded()', () => {
  let actionServiceLoadByIdsSpy: jest.SpyInstance;
  let actionService: ActionService | null;
  beforeEach(() => {
    createStore();
    featureRegistry.registerFeature(feature);
    entityDefinitionCache(feature, entity, {
      entityAdapter: createEntityAdapter(),
    } as SmartEntityDefinition<SmartNgRXRowBase>);
    entityRegistry.register(feature, entity, {
      markAndDeleteInit: { markDirtyFetchesNew: true },
    } as EntityAttributes);
    // setup the store so the feature exist and we can retrieve the action service
    createStore();
    setState(feature, entity, {
      ids: [],
      entities: {},
    });
    actionService = actionServiceRegistry.register(feature, entity);
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
  });
});
