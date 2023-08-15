import { createAction, props } from '@ngrx/store';

import { ensureDataLoaded } from './ensure-data-loaded.function';
import { entityStateFactory } from './mocks/entity-state.factory';

const mockDispatch = jest.fn();

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

describe('ensureDataLoaded', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('dispatches action when the entity does not exist', () => {
    const state = {
      ids: [],
      entities: {},
    };

    ensureDataLoaded(state, 'space1', mockAction);

    expect(mockDispatch).toHaveBeenLastCalledWith(
      mockAction({
        ids: ['space1'],
      })
    );
  });

  it('dispatches action when the entity is dirty', () => {
    const state = entityStateFactory({
      parentCount: 1,
      childCount: 0,
      parentType: 'space',
      childType: 'folder',
      isDirty: true,
    });

    ensureDataLoaded(state, 'space-1', mockAction);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenLastCalledWith(
      mockAction({
        ids: ['space-1'],
      })
    );
  });

  it('does not dispatch action if the entity is already loaded and is not dirty', () => {
    const state = entityStateFactory({
      parentCount: 1,
      childCount: 0,
      parentType: 'space',
      childType: 'folder',
      isDirty: false,
    });

    ensureDataLoaded(state, 'space-1', mockAction);

    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });
});