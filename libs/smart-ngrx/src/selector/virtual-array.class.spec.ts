import { MockStore } from '@ngrx/store/testing';

import { ActionGroup } from '../actions/action-group.interface';
import { castTo } from '../common/cast-to.function';
import { createStore } from '../tests/functions/create-store.function';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { store } from './store.function';
import { VirtualArray } from './virtual-array.class';

describe('VirtualArray', () => {
  let virtualArray: VirtualArray<object>;
  let mockDispatch: jest.Mock;
  let mockStore: MockStore;

  const mockActionGroup = castTo<ActionGroup>({
    loadByIndexes: jest.fn(),
  });

  const mockArrayContents: VirtualArrayContents = {
    indexes: ['1', '2', '3'],
    length: 3,
  };

  beforeEach(() => {
    createStore();
    mockStore = store() as MockStore;
    mockDispatch = jest.fn();
    jest.spyOn(mockStore, 'dispatch').mockImplementation(mockDispatch);

    virtualArray = new VirtualArray(
      mockArrayContents,
      mockActionGroup,
      'parentId',
      'childField',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the value at the index if the prop is a string that is a number and the index exists in rawArray', () => {
    expect(virtualArray[0]).toBe('1');
    expect(virtualArray[1]).toBe('2');
    expect(virtualArray[2]).toBe('3');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should dispatch loadByIndexes action if the prop is a string that is a number and the index does not exist in rawArray', () => {
    expect(virtualArray[3]).toBe('index-3');
    expect(mockDispatch).toHaveBeenCalledWith(
      mockActionGroup.loadByIndexes({
        indexes: [3],
        parentId: 'parentId',
        childField: 'childField',
      }),
    );
  });

  it('should return the value of the property if the prop is anything other than a string that is a number', () => {
    expect(virtualArray.length).toBe(3);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
