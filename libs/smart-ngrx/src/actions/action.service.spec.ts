/* eslint-disable sonarjs/no-duplicate-string -- conflicting rules */
import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { store as storeFunction } from '../selector/store.function';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ActionService } from './action.service';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
}

describe('ActionService', () => {
  const feature = 'feature';
  const entity = 'entity';
  let store: MockStore;
  let storeDispatchSpy: jest.SpyInstance;
  let service: ActionService<Row>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [feature]: {
              entities: {
                '2': { id: '2', name: 'name', isDirty: false },
                ids: ['2'],
              },
            },
          },
        }),
      ],
    });
    store = TestBed.inject(MockStore);
    storeFunction(store);
    entityDefinitionCache(feature, entity, {
      entityName: entity,
      effectServiceToken: null, // serviceToken isn't needed for these tests
      defaultRow: (id: string) => ({ id, name: '', foo: '', isDirty: false }),
      entityAdapter: createEntityAdapter(),
    } as unknown as SmartEntityDefinition<Row>);
    service = new ActionService<Row>(
      feature as StringLiteralSource<string>,
      entity as StringLiteralSource<string>,
    );
  });
  describe('markDirty()', () => {
    describe('when the id is not in the entities', () => {
      beforeEach(() => {
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        service.markDirty(['1']);
      });
      it('should not dispatch an action', () => {
        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });
    });
    describe('when the id is in the entities', () => {
      describe('and it is not being edited', () => {
        beforeEach(() => {
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.markDirty(['2']);
        });
        it('should dispatch an action', () => {
          expect(storeDispatchSpy).toHaveBeenCalled();
        });
      });
      describe('and it is being edited', () => {
        beforeEach(() => {
          service.loadByIdsSuccess([
            { id: '2', name: 'name', isDirty: false, isEditing: true },
          ]);
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.markDirty(['2']);
        });
        it('should not dispatch an action', () => {
          expect(storeDispatchSpy).toHaveBeenCalled();
        });
      });
    });
  });
  describe('garbageCollect()', () => {
    describe('when the id is not in the entities', () => {
      beforeEach(() => {
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
        service.garbageCollect(['1']);
      });
      it('should not dispatch an action', () => {
        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });
    });
    describe('when the id is in the entities', () => {
      describe('and it is not being edited', () => {
        beforeEach(() => {
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.garbageCollect(['2']);
        });
        it('should dispatch an action', () => {
          expect(storeDispatchSpy).toHaveBeenCalled();
        });
      });
      describe('and it is being edited', () => {
        beforeEach(() => {
          service.loadByIdsSuccess([
            { id: '2', name: 'name', isDirty: false, isEditing: true },
          ]);
          storeDispatchSpy = jest.spyOn(store, 'dispatch');
          service.garbageCollect(['2']);
        });
        it('should not dispatch an action', () => {
          expect(storeDispatchSpy).toHaveBeenCalled();
        });
      });
    });
  });
});
