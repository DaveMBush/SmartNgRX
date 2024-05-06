/* eslint-disable sonarjs/no-duplicate-string -- conflicting rules */
import { createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { store as storeFunction } from '../selector/store.function';
import { createStore } from '../tests/functions/create-store.function';
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
  Omit<ActionService<Row>, 'markDirtyWithEntities'>,
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
    entityDefinitionCache(feature, entity, {
      entityName: entity,
      effectServiceToken: null, // serviceToken isn't needed for these tests
      defaultRow: (id: string) => ({ id, name: '', foo: '', isDirty: false }),
      entityAdapter: createEntityAdapter(),
    } as unknown as SmartEntityDefinition<Row>);
    service = castTo<PublicMarkDirtyWithEntities>(
      new ActionService<Row>(
        feature as StringLiteralSource<string>,
        entity as StringLiteralSource<string>,
      ),
    );
  });
  describe('markDirtyWithEntities()', () => {
    describe('when the id is not in the entities', () => {
      beforeEach(() => {
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        service.markDirtyWithEntities(
          {
            '2': { id: '2', name: 'name', isDirty: false },
          },
          ['1'],
        );
      });
      it('should not dispatch an action', () => {
        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });
    });
    describe('when the id is in the entities', () => {
      describe('and it is not being edited', () => {
        beforeEach(() => {
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.markDirtyWithEntities(
            {
              '2': { id: '2', name: 'name', isDirty: false },
            },
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
          service.markDirtyWithEntities(
            {
              '2': { id: '2', name: 'name', isDirty: false, isEditing: true },
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
  describe('garbageCollectWithEntities()', () => {
    describe('when the id is not in the entities', () => {
      beforeEach(() => {
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        service.garbageCollectWithEntities(
          { '2': { id: '2', name: 'name', isDirty: false } },
          ['1'],
        );
      });
      it('should not dispatch an action', () => {
        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });
    });
    describe('when the id is in the entities', () => {
      describe('and it is not being edited', () => {
        beforeEach(() => {
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.garbageCollectWithEntities(
            { '2': { id: '2', name: 'name', isDirty: false } },
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
            { '2': { id: '2', name: 'name', isDirty: false, isEditing: true } },
            ['2'],
          );
        });
        it('should not dispatch an action', () => {
          expect(storeDispatchSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
