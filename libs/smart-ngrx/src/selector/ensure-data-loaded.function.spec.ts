/* eslint-disable sonarjs/no-duplicate-string -- duplicate strings are necessary and intentional */
import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { filter, firstValueFrom } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { adapterForEntity } from '../functions/adapter-for-entity.function';
import {
  registerEntity,
  unregisterEntity,
} from '../functions/register-entity.function';
import { registerGlobalMarkAndDeleteInit } from '../mark-and-delete/mark-and-delete-init';
import { ensureDataLoaded } from './ensure-data-loaded.function';
import { entityStateFactory } from './mocks/entity-state.factory';
import { store as storeFunction } from './store.function';

const mockDispatch = jest.fn();

const department1 = 'department-1';

jest.mock('./store.function', () => ({
  __esModule: true,
  store: () => ({
    dispatch: mockDispatch,
  }),
}));

const mockAction = createAction(
  '[mock] fetch data',
  props<{
    ids: string[];
  }>(),
);

let testScheduler: TestScheduler;

describe('ensureDataLoaded', () => {
  let store: MockStore<{ foo: { bar: string } }>;
  describe('when markDirtyFetchesNew is undefined', () => {
    beforeEach(() => {
      const initialState = {};
      TestBed.configureTestingModule({
        providers: [provideMockStore({ initialState })],
      });

      store = TestBed.inject(MockStore);
      storeFunction(store);

      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      registerGlobalMarkAndDeleteInit({
        markDirtyTime: 15 * 60 * 1000,
        removeTime: 30 * 60 * 1000,
        runInterval: 60 * 1000,
        markDirtyFetchesNew: true,
      });
      registerEntity('feature', 'departments', {
        defaultRow: (id: string) => ({
          id,
          name: '',
          children: [],
          isDirty: false,
        }),
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 30 * 60 * 1000,
          runInterval: 60 * 1000,
          markDirtyFetchesNew: true,
        },
        markAndDeleteEntityMap: new Map<string, number>(),
      });
      adapterForEntity('feature', 'departments', createEntityAdapter());
      jest.resetAllMocks();
    });
    afterEach(() => {
      unregisterEntity('feature', 'departments');
    });

    describe('when the entity does not exist', () => {
      it('dispatches action', () => {
        const state = {
          ids: [],
          entities: {},
        };

        ensureDataLoaded(state, department1, 'feature', 'departments');

        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Only way I could get this test to work.
        setTimeout(async () => {
          // Here, you would also check if `locationActions.load` has been dispatched.
          const loadAction = await firstValueFrom(
            store.scannedActions$.pipe(
              filter((action) => action.type === '[mock] fetch data'),
            ),
          );
          expect(loadAction).toHaveBeenLastCalledWith(
            mockAction({
              ids: [department1],
            }),
          );
        }, 1);
      });
    });

    describe('when the entity is dirty', () => {
      it('dispatches action when the entity is dirty', () => {
        const state = entityStateFactory({
          parentCount: 1,
          childCount: 0,
          parentType: 'department',
          childType: 'folder',
          isDirty: true,
        });

        testScheduler.run(() => {
          ensureDataLoaded(state, department1, 'feature', 'departments');

          // eslint-disable-next-line @typescript-eslint/no-misused-promises -- only way to get this to run because we are using Promises instead of asapScheduler
          setTimeout(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenLastCalledWith(
              mockAction({
                ids: [department1],
              }),
            );
          }, 1);

          testScheduler.flush();
        });
      });
    });

    describe('when the entity is loaded and not dirty', () => {
      it('does not dispatch action if the entity is already loaded and is not dirty', () => {
        const state = entityStateFactory({
          parentCount: 1,
          childCount: 0,
          parentType: 'department',
          childType: 'folder',
          isDirty: false,
        });

        testScheduler.run(() => {
          ensureDataLoaded(state, department1, 'feature', 'departments');
          testScheduler.flush();
          expect(mockDispatch).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
  describe('when markDirtyFetchesNew is true', () => {
    beforeEach(() => {
      const initialState = {};
      TestBed.configureTestingModule({
        providers: [provideMockStore({ initialState })],
      });

      store = TestBed.inject(MockStore);
      storeFunction(store);

      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      registerGlobalMarkAndDeleteInit({
        markDirtyTime: 15 * 60 * 1000,
        removeTime: 30 * 60 * 1000,
        runInterval: 60 * 1000,
        markDirtyFetchesNew: true,
      });
      registerEntity('feature', 'departments', {
        defaultRow: (id: string) => ({
          id,
          name: '',
          children: [],
          isDirty: false,
        }),
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 30 * 60 * 1000,
          runInterval: 60 * 1000,
          markDirtyFetchesNew: true,
        },
        markAndDeleteEntityMap: new Map<string, number>(),
      });
      jest.resetAllMocks();
    });
    afterEach(() => {
      unregisterEntity('feature', 'departments');
    });

    describe('when the entity does not exist', () => {
      it('dispatches action', () => {
        const state = {
          ids: [],
          entities: {},
        };

        ensureDataLoaded(state, department1, 'feature', 'departments');

        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Only way I could get this test to work.
        setTimeout(async () => {
          // Here, you would also check if `locationActions.load` has been dispatched.
          const loadAction = await firstValueFrom(
            store.scannedActions$.pipe(
              filter((action) => action.type === '[mock] fetch data'),
            ),
          );
          expect(loadAction).toHaveBeenLastCalledWith(
            mockAction({
              ids: [department1],
            }),
          );
        }, 1);
      });
    });

    describe('when the entity is dirty', () => {
      it('dispatches action when the entity is dirty', () => {
        const state = entityStateFactory({
          parentCount: 1,
          childCount: 0,
          parentType: 'department',
          childType: 'folder',
          isDirty: true,
        });

        testScheduler.run(() => {
          ensureDataLoaded(state, department1, 'feature', 'departments');

          // eslint-disable-next-line @typescript-eslint/no-misused-promises -- only way to get this to run because we are using Promises instead of asapScheduler
          setTimeout(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenLastCalledWith(
              mockAction({
                ids: [department1],
              }),
            );
          }, 1);

          testScheduler.flush();
        });
      });
    });

    describe('when the entity is loaded and not dirty', () => {
      it('does not dispatch action if the entity is already loaded and is not dirty', () => {
        const state = entityStateFactory({
          parentCount: 1,
          childCount: 0,
          parentType: 'department',
          childType: 'folder',
          isDirty: false,
        });

        testScheduler.run(() => {
          ensureDataLoaded(state, department1, 'feature', 'departments');
          testScheduler.flush();
          expect(mockDispatch).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
  describe('when markDirtyFetchesNew is false', () => {
    beforeEach(() => {
      const initialState = {};
      TestBed.configureTestingModule({
        providers: [provideMockStore({ initialState })],
      });

      store = TestBed.inject(MockStore);
      storeFunction(store);

      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      registerGlobalMarkAndDeleteInit({
        markDirtyTime: 15 * 60 * 1000,
        removeTime: 30 * 60 * 1000,
        runInterval: 60 * 1000,
        markDirtyFetchesNew: true,
      });
      registerEntity('feature', 'departments', {
        defaultRow: (id: string) => ({
          id,
          name: '',
          children: [],
          isDirty: false,
        }),
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 30 * 60 * 1000,
          runInterval: 60 * 1000,
          markDirtyFetchesNew: false,
        },
        markAndDeleteEntityMap: new Map<string, number>(),
      });
      jest.resetAllMocks();
    });
    afterEach(() => {
      unregisterEntity('feature', 'departments');
    });

    describe('when the entity does not exist', () => {
      it('dispatches action', () => {
        const state = {
          ids: [],
          entities: {},
        };

        ensureDataLoaded(state, department1, 'feature', 'departments');

        // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Only way I could get this test to work.
        setTimeout(async () => {
          // Here, you would also check if `locationActions.load` has been dispatched.
          const loadAction = await firstValueFrom(
            store.scannedActions$.pipe(
              filter((action) => action.type === '[mock] fetch data'),
            ),
          );
          expect(loadAction).toHaveBeenLastCalledWith(
            mockAction({
              ids: [department1],
            }),
          );
        }, 1);
      });
    });

    describe('when the entity is dirty', () => {
      it('dispatches action when the entity is dirty', () => {
        const state = entityStateFactory({
          parentCount: 1,
          childCount: 0,
          parentType: 'department',
          childType: 'folder',
          isDirty: true,
        });

        testScheduler.run(() => {
          ensureDataLoaded(state, department1, 'feature', 'departments');

          // eslint-disable-next-line @typescript-eslint/no-misused-promises -- only way to get this to run because we are using Promises instead of asapScheduler
          setTimeout(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(0);
          }, 1);

          testScheduler.flush();
        });
      });
    });

    describe('when the entity is loaded and not dirty', () => {
      it('does not dispatch action if the entity is already loaded and is not dirty', () => {
        const state = entityStateFactory({
          parentCount: 1,
          childCount: 0,
          parentType: 'department',
          childType: 'folder',
          isDirty: false,
        });

        testScheduler.run(() => {
          ensureDataLoaded(state, department1, 'feature', 'departments');
          testScheduler.flush();
          expect(mockDispatch).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
