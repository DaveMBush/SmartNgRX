import { TestBed } from '@angular/core/testing';
import { createAction, props } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { filter, firstValueFrom } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

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
    jest.resetAllMocks();
  });

  it('dispatches action when the entity does not exist', () => {
    const state = {
      ids: [],
      entities: {},
    };

    ensureDataLoaded(state, 'department1', mockAction);

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
          ids: ['department1'],
        }),
      );
    }, 1);
  });

  it('dispatches action when the entity is dirty', () => {
    const state = entityStateFactory({
      parentCount: 1,
      childCount: 0,
      parentType: 'department',
      childType: 'folder',
      isDirty: true,
    });

    testScheduler.run(() => {
      ensureDataLoaded(state, department1, mockAction);

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

  it('does not dispatch action if the entity is already loaded and is not dirty', () => {
    const state = entityStateFactory({
      parentCount: 1,
      childCount: 0,
      parentType: 'department',
      childType: 'folder',
      isDirty: false,
    });

    testScheduler.run(() => {
      ensureDataLoaded(state, department1, mockAction);
      testScheduler.flush();
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });
});
