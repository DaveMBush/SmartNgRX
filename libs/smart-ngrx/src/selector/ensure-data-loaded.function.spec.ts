/* eslint-disable sonarjs/no-duplicate-string -- conflicting rule */
import { createEntityAdapter } from '@ngrx/entity';

import { ActionService } from '../actions/action.service';
import { actionServiceRegistry } from '../registrations/action.service.registry';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import {
  registerEntity,
  unregisterEntity,
} from '../registrations/register-entity.function';
import { createStore } from '../tests/functions/create-store.function';
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
  let actionService: ActionService;
  beforeEach(() => {
    createStore();
    entityDefinitionCache(feature, entity, {
      entityAdapter: createEntityAdapter(),
    } as SmartEntityDefinition<SmartNgRXRowBase>);
    registerEntity(feature, entity, {
      markAndDeleteInit: { markDirtyFetchesNew: true },
    } as EntityAttributes);
    actionService = actionServiceRegistry(feature, entity);
    actionServiceLoadByIdsSpy = jest.spyOn(actionService, 'loadByIds');
  });
  afterEach(() => {
    jest.clearAllMocks();
    unregisterEntity(feature, entity);
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
