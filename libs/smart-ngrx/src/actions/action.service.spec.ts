/* eslint-disable sonarjs/no-duplicate-string -- conflicting rules */
import { createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import {
  registerEntity,
  unregisterEntity,
} from '../registrations/register-entity.function';
import { store as storeFunction } from '../selector/store.function';
import { createStore } from '../tests/functions/create-store.function';
import { setState } from '../tests/functions/set-state.function';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { MarkAndDeleteInit } from '../types/mark-and-delete-init.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ActionService } from './action.service';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
}

interface PrivatesArePublic {
  markDirtyWithEntities(entities: Dictionary<Row>, ids: string[]): void;
  garbageCollectWithEntities(entities: Dictionary<Row>, ids: string[]): void;
}

type PublicMarkDirtyWithEntities = Omit<
  Omit<ActionService, 'markDirtyWithEntities'>,
  'garbageCollectWithEntities'
> &
  PrivatesArePublic;

describe('ActionService', () => {
  const feature = 'feature';
  const entity = 'entity';
  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;
  let service: PublicMarkDirtyWithEntities;
  beforeEach(() => {
    createStore();
    store = storeFunction();
    registerEntity(feature, entity, {
      markAndDeleteInit: {},
    } as EntityAttributes);
    entityDefinitionCache(feature, entity, {
      entityName: entity,
      effectServiceToken: null, // serviceToken isn't needed for these tests
      defaultRow: (id: string) => ({
        id,
        name: '',
        foo: '',
      }),
      entityAdapter: createEntityAdapter(),
    } as unknown as SmartEntityDefinition<Row>);
    service = castTo<PublicMarkDirtyWithEntities>(
      new ActionService(feature, entity),
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
    unregisterEntity(feature, entity);
  });
  describe('markDirtyWithEntities()', () => {
    describe('when the id is not in the entities', () => {
      beforeEach(() => {
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        service.markDirtyWithEntities(
          {
            '2': { id: '2', name: 'name' },
          },
          ['1'],
        );
      });
      it('should not dispatch any ids in the action', () => {
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            changes: [],
          }),
        );
      });
    });
    describe('when the id is in the entities', () => {
      describe('and it is not being edited', () => {
        beforeEach(() => {
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.markDirtyWithEntities(
            {
              '2': { id: '2', name: 'name' },
            },
            ['2'],
          );
        });
        it('should dispatch an action', () => {
          expect(storeDispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({
              changes: [
                {
                  id: '2',
                  changes: {
                    isDirty: true,
                  },
                },
              ],
            }),
          );
        });
      });
      describe('and it is being edited', () => {
        beforeEach(() => {
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.markDirtyWithEntities(
            {
              '2': {
                id: '2',
                name: 'name',
                isEditing: true,
              },
            },
            ['2'],
          );
        });
        it('should not dispatch an action', () => {
          expect(storeDispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({
              changes: [],
            }),
          );
        });
      });
    });
  });
  describe('garbageCollectWithEntities()', () => {
    describe('when the id is not in the entities', () => {
      beforeEach(() => {
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        service.garbageCollectWithEntities({ '2': { id: '2', name: 'name' } }, [
          '1',
        ]);
      });
      it('should dispatch an action but there should not be any changes', () => {
        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });
    });
    describe('when the id is in the entities', () => {
      describe('and it is not being edited', () => {
        beforeEach(() => {
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.garbageCollectWithEntities(
            { '2': { id: '2', name: 'name' } },
            ['2'],
          );
        });
        it('should dispatch an action', () => {
          expect(storeDispatchSpy).toHaveBeenCalled();
        });
      });
      describe('and it is being edited', () => {
        beforeEach(() => {
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.garbageCollectWithEntities(
            {
              '2': {
                id: '2',
                name: 'name',
                isEditing: true,
              },
            },
            ['2'],
          );
        });
        it('should not dispatch an action', () => {
          expect(storeDispatchSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
  describe('markDirty()', () => {
    beforeEach(() => {
      setState(feature, entity, {
        ids: ['1'],
        entities: { '1': { id: '1', name: 'name' } },
      });
    });
    let markDirtyWithEntitiesSpy: jest.SpyInstance;
    describe('when markDirtyFetchesNew is false', () => {
      beforeEach(() => {
        // we have to unregister the entity and re-register because
        // we already registered it in the top level beforeEach()
        unregisterEntity(feature, entity);
        registerEntity(feature, entity, {
          markAndDeleteInit: {
            markDirtyFetchesNew: false,
          } as MarkAndDeleteInit,
        } as EntityAttributes);
        service = castTo<PublicMarkDirtyWithEntities>(
          new ActionService(feature, entity),
        );
        markDirtyWithEntitiesSpy = jest.spyOn(service, 'markDirtyWithEntities');
        service.markDirty(['1']);
      });

      it('should not call markDirtyWithEntities', () => {
        expect(markDirtyWithEntitiesSpy).not.toHaveBeenCalled();
      });
    });
    describe('when markDirtyFetchesNew is true', () => {
      beforeEach(() => {
        // we have to unregister the entity and re-register because
        // we already registered it in the top level beforeEach()
        unregisterEntity(feature, entity);
        registerEntity(feature, entity, {
          markAndDeleteInit: {
            markDirtyFetchesNew: true,
          } as MarkAndDeleteInit,
        } as EntityAttributes);
        service = castTo<PublicMarkDirtyWithEntities>(
          new ActionService(feature, entity),
        );
        markDirtyWithEntitiesSpy = jest.spyOn(service, 'markDirtyWithEntities');
        service.markDirty(['1']);
      });

      it('should not call markDirtyWithEntities', () => {
        expect(markDirtyWithEntitiesSpy).toHaveBeenCalled();
      });
    });
    describe('when markDirtyFetchesNew is undefined', () => {
      beforeEach(() => {
        // we have to unregister the entity and re-register because
        // we already registered it in the top level beforeEach()
        unregisterEntity(feature, entity);
        registerEntity(feature, entity, {
          markAndDeleteInit: {},
        } as EntityAttributes);
        // castTo make markDirtyWithEntities public
        service = castTo<PublicMarkDirtyWithEntities>(
          new ActionService(feature, entity),
        );
        markDirtyWithEntitiesSpy = jest.spyOn(service, 'markDirtyWithEntities');
        service.markDirty(['1']);
      });

      it('should not call markDirtyWithEntities', () => {
        expect(markDirtyWithEntitiesSpy).toHaveBeenCalled();
      });
    });
  });
});
