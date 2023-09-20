import { createAction, props } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';

import { ensureDataLoaded } from './ensure-data-loaded.function';
import { entityStateFactory } from './mocks/entity-state.factory';

const mockDispatch = jest.fn();

const department1 = 'department1';

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
  }>()
);

let testScheduler: TestScheduler;

describe('ensureDataLoaded', () => {
  beforeEach(() => {
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

    testScheduler.run(() => {
      ensureDataLoaded(state, 'department1', mockAction);

      testScheduler.flush();

      expect(mockDispatch).toHaveBeenLastCalledWith(
        mockAction({
          ids: ['department1'],
        })
      );
    });
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

      testScheduler.flush();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenLastCalledWith(
        mockAction({
          ids: [department1],
        })
      );
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
