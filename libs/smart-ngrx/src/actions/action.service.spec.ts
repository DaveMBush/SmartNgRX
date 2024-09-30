/* eslint-disable sonarjs/no-duplicate-string -- conflicting rules */
import { fakeAsync, tick } from '@angular/core/testing';
import { createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { psi } from '../common/psi.const';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import {
  registerEntity,
  unregisterEntity,
} from '../registrations/register-entity.function';
import { newRowRegistry } from '../selector/new-row-registry.class';
import { store as storeFunction } from '../selector/store.function';
import { createStore } from '../tests/functions/create-store.function';
import { setState } from '../tests/functions/set-state.function';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { MarkAndDeleteInit } from '../types/mark-and-delete-init.interface';
import { PartialArrayDefinition } from '../types/partial-array-definition.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { ActionService } from './action.service';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
}

interface PrivatesArePublic {
  markDirtyWithEntities(entities: Dictionary<Row>, ids: string[]): void;
  garbageCollectWithEntities(entities: Dictionary<Row>, ids: string[]): void;
  processLoadByIndexesSuccess(
    field: VirtualArrayContents,
    array: PartialArrayDefinition,
  ): VirtualArrayContents;
}

type PublicMarkDirtyWithEntities = Omit<
  Omit<
    Omit<ActionService, 'markDirtyWithEntities'>,
    'garbageCollectWithEntities'
  >,
  'processLoadByIndexesSuccess'
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
    setState(feature, entity, {
      ids: [],
      entities: {},
    });
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
    service.init();
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
        service.init();
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
        service.init();
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
        service.init();
        markDirtyWithEntitiesSpy = jest.spyOn(service, 'markDirtyWithEntities');
        service.markDirty(['1']);
      });

      it('should not call markDirtyWithEntities', () => {
        expect(markDirtyWithEntitiesSpy).toHaveBeenCalled();
      });
    });
  });
  describe('processLoadByIndexesSuccess', () => {
    let field: VirtualArrayContents;

    beforeEach(() => {
      field = {
        indexes: ['1', '2', '3'],
        length: 3,
      };
    });

    it('should update indexes with new values', () => {
      const array: PartialArrayDefinition = {
        indexes: ['4', '5'],
        startIndex: 1,
        length: 5,
      };

      const result = service.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '4', '5']);
      expect(result.length).toBe(5);
    });

    it('should handle empty input array', () => {
      const array: PartialArrayDefinition = {
        indexes: [],
        startIndex: 0,
        length: 3,
      };

      const result = service.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '2', '3']);
      expect(result.length).toBe(3);
    });

    it('should update length when total is greater', () => {
      const array: PartialArrayDefinition = {
        indexes: ['4'],
        startIndex: 3,
        length: 10,
      };

      const result = service.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '2', '3', '4']);
      expect(result.length).toBe(10);
    });

    it('should handle startIndex greater than current length', () => {
      const array: PartialArrayDefinition = {
        indexes: ['4', '5'],
        startIndex: 5,
        length: 7,
      };

      const result = service.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual([
        '1',
        '2',
        '3',
        undefined,
        undefined,
        '4',
        '5',
      ]);
      expect(result.length).toBe(7);
    });

    it('should not change length when total is less than current length', () => {
      const array: PartialArrayDefinition = {
        indexes: ['4'],
        startIndex: 1,
        length: 2,
      };

      const result = service.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '4', '3']);
      expect(result.length).toBe(2);
    });

    it('should handle new row case', () => {
      jest.spyOn(newRowRegistry, 'isNewRow').mockReturnValue(true);

      const array: PartialArrayDefinition = {
        indexes: ['4', '5', 'new'],
        startIndex: 2,
        length: 5,
      };

      const result = service.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '2', '4', '5', 'new', 'new']);
      expect(result.length).toBe(6);

      jest.restoreAllMocks();
    });
  });
  describe('loadByIds()', () => {
    beforeEach(() => {
      storeDispatchSpy = jest.spyOn(store, 'dispatch');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    describe('when the ids are not yet in the store', () => {
      beforeEach(() => {
        setState(feature, entity, {
          ids: [],
          entities: {},
        });
      });
      it('should dispatch an action with the ids', fakeAsync(() => {
        const ids = ['1', '2', '3'];
        service.loadByIds(ids);

        tick(); // Wait for the observable to emit

        expect(storeDispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            type: `[${feature}${psi}${entity}] Load By Ids`,
            ids,
          }),
        );
      }));
    });
    describe('when the ids are already in the store and currently being loaded', () => {
      beforeEach(() => {
        setState(feature, entity, {
          ids: [],
          entities: {
            '1': { id: '1', name: 'name', isLoading: true },
            '2': { id: '2', name: 'name', isLoading: true },
            '3': { id: '3', name: 'name', isLoading: true },
          },
        });
      });
      it('should not dispatch the loadByIds action', fakeAsync(() => {
        const ids = ['1', '2', '3'];

        service.loadByIds(ids);

        tick(); // Wait for the observable to emit

        expect(storeDispatchSpy).not.toHaveBeenCalled();
      }));
    });
  });
});
