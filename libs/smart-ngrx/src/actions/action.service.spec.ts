/* eslint-disable sonarjs/no-duplicate-string -- conflicting rules */
import { fakeAsync, tick } from '@angular/core/testing';
import { createEntityAdapter, Dictionary, EntityAdapter } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { psi } from '../common/psi.const';
import { actionServiceRegistry } from '../registrations/action.service.registry';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { featureRegistry } from '../registrations/feature-registry.class';
import {
  registerEntity,
  unregisterEntity,
} from '../registrations/register-entity.function';
import { newRowRegistry } from '../selector/new-row-registry.class';
import { clearState } from '../tests/functions/clear-state.function';
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
  init(): boolean;
  actions: Record<string, unknown>;
  entityDefinition: SmartEntityDefinition<Row>;
  entityAdapter: EntityAdapter<Row>;
  entities: Dictionary<Row>;
  markDirtyFetchesNew: boolean;
  store: Store;
}

type PublicMarkDirtyWithEntities = Omit<
  Omit<
    Omit<
      Omit<
        Omit<ActionService, 'markDirtyWithEntities'>,
        'garbageCollectWithEntities'
      >,
      'processLoadByIndexesSuccess'
    >,
    'markDirtyFetchesNew'
  >,
  'store'
> &
  PrivatesArePublic;

describe('ActionService', () => {
  const feature = 'feature';
  const entity = 'entity';
  let storeDispatchSpy: jest.SpyInstance;
  let service: PublicMarkDirtyWithEntities | null;
  beforeEach(() => {
    createStore();
    featureRegistry.registerFeature(feature);
    clearState();
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

    service = actionServiceRegistry(
      feature,
      entity,
    ) as unknown as PublicMarkDirtyWithEntities | null;
    assert(!!service, 'service should be defined');
    storeDispatchSpy = jest.spyOn(service.store, 'dispatch');
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    unregisterEntity(feature, entity);
  });
  describe('markDirtyWithEntities()', () => {
    describe('when the id is not in the entities', () => {
      beforeEach(() => {
        service!.markDirtyWithEntities(
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
          const entities = {
            '2': { id: '2', name: 'name', isDirty: true },
          };
          const ids = ['2'];

          service!.markDirtyWithEntities(entities, ids);
        });
        it('should dispatch an action', () => {
          expect(storeDispatchSpy).toHaveBeenCalled();
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
          service!.markDirtyWithEntities(
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
        service!.garbageCollectWithEntities(
          { '2': { id: '2', name: 'name' } },
          ['1'],
        );
      });
      it('should dispatch an action but there should not be any changes', () => {
        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });
    });
    describe('when the id is in the entities', () => {
      describe('and it is not being edited', () => {
        beforeEach(() => {
          service!.garbageCollectWithEntities(
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
          service!.garbageCollectWithEntities(
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
        markDirtyWithEntitiesSpy = jest.spyOn(
          service!,
          'markDirtyWithEntities',
        );
        service!.markDirtyFetchesNew = false;
        service!.markDirty(['1']);
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
        markDirtyWithEntitiesSpy = jest.spyOn(
          service!,
          'markDirtyWithEntities',
        );
        service!.markDirtyFetchesNew = true;
        service!.markDirty(['1']);
      });

      it('should not call markDirtyWithEntities', () => {
        expect(markDirtyWithEntitiesSpy).toHaveBeenCalled();
      });
    });
    describe('when markDirtyFetchesNew is undefined', () => {
      beforeEach(() => {
        // we have to unregister the entity and re-register because
        // we already registered it in the top level   beforeEach()
        unregisterEntity(feature, entity);
        registerEntity(feature, entity, {
          markAndDeleteInit: {},
        } as EntityAttributes);
        markDirtyWithEntitiesSpy = jest.spyOn(
          service!,
          'markDirtyWithEntities',
        );
        service!.markDirty(['1']);
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

      const result = service!.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '4', '5']);
      expect(result.length).toBe(5);
    });

    it('should handle empty input array', () => {
      const array: PartialArrayDefinition = {
        indexes: [],
        startIndex: 0,
        length: 3,
      };

      const result = service!.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '2', '3']);
      expect(result.length).toBe(3);
    });

    it('should update length when total is greater', () => {
      const array: PartialArrayDefinition = {
        indexes: ['4'],
        startIndex: 3,
        length: 10,
      };

      const result = service!.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '2', '3', '4']);
      expect(result.length).toBe(10);
    });

    it('should handle startIndex greater than current length', () => {
      const array: PartialArrayDefinition = {
        indexes: ['4', '5'],
        startIndex: 5,
        length: 7,
      };

      const result = service!.processLoadByIndexesSuccess(field, array);

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

      const result = service!.processLoadByIndexesSuccess(field, array);

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

      const result = service!.processLoadByIndexesSuccess(field, array);

      expect(result.indexes).toEqual(['1', '2', '4', '5', 'new', 'new']);
      expect(result.length).toBe(6);

      jest.restoreAllMocks();
    });
  });
  describe('loadByIds()', () => {
    describe('when the ids are not yet in the store', () => {
      beforeEach(() => {
        setState(feature, entity, {
          ids: [],
          entities: {},
        });
      });
      it('should dispatch an action with the ids', fakeAsync(() => {
        const ids = ['1', '2', '3'];
        service!.loadByIds(ids);

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
        // we can't use setState here because we mocked the store in the service
        // and that is what everything is looking at
        castTo<MockStore>(service!.store).setState({
          [feature]: {
            [entity]: {
              ids: ['1', '2', '3'],
              entities: {
                '1': { id: '1', name: 'name', isLoading: true },
                '2': { id: '2', name: 'name', isLoading: true },
                '3': { id: '3', name: 'name', isLoading: true },
              },
            },
          },
        });
      });
      it('should not dispatch the loadByIds action', fakeAsync(() => {
        const ids = ['1', '2', '3'];

        service!.loadByIds(ids);

        tick(); // Wait for the observable to emit

        expect(storeDispatchSpy).not.toHaveBeenCalled();
      }));
    });
  });
  describe('init()', () => {
    describe('when the feature is not registered', () => {
      beforeEach(() => {
        jest.spyOn(featureRegistry, 'hasFeature').mockReturnValue(false);
        service!.actions = undefined as unknown as Record<string, unknown>;
        service!.entityDefinition =
          undefined as unknown as SmartEntityDefinition<Row>;
        service!.entityAdapter = undefined as unknown as EntityAdapter<Row> &
          EntityAdapter<SmartNgRXRowBase>;
        service!.entities = undefined as unknown as Dictionary<Row> &
          Observable<Dictionary<SmartNgRXRowBase>>;
      });

      it('should return false', () => {
        const result = service!.init();
        expect(result).toBe(false);
      });

      it('should not set up the service properties', () => {
        service!.init();
        expect(service!.actions).toBeUndefined();
        expect(service!.entityDefinition).toBeUndefined();
        expect(service!.entityAdapter).toBeUndefined();
        expect(service!.entities).toBeUndefined();
      });
    });

    describe('when the feature is registered', () => {
      beforeEach(() => {
        jest.spyOn(featureRegistry, 'hasFeature').mockReturnValue(true);
      });

      it('should return true', () => {
        const result = service!.init();
        expect(result).toBe(true);
      });

      it('should set up the service properties', () => {
        service!.init();
        expect(service!.actions).toBeDefined();
        expect(service!.entityDefinition).toBeDefined();
        expect(service!.entityAdapter).toBeDefined();
        expect(service!.entities).toBeDefined();
      });
    });
  });
});
