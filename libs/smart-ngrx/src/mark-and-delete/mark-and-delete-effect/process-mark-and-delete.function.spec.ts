import { Store } from '@ngrx/store';

import { castTo } from '../../common/cast-to.function';
import { psi } from '../../common/theta.const';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
import { store as storeFunction } from '../../selector/store.function';
import { processMarkAndDelete } from './process-mark-and-delete.function';

// we have to supply requestIdleCallback for jest
window.requestIdleCallback = (
  cb: IdleRequestCallback,
  _?: IdleRequestOptions,
): number => {
  cb({ didTimeout: false, timeRemaining: () => 1000 });
  return 0;
};

describe('processMarkAndDelete', () => {
  let mockStore: { dispatch: jest.Mock };
  const featureKey = 'exampleFeature' as StringLiteralSource<string>;

  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn(),
    };
    storeFunction(castTo<Store>(mockStore));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should dispatch garbageCollect actions for each key in garbageCollectKeysMap', () => {
    const garbageCollectKeysMap = {
      key1: ['id1', 'id2'],
      key2: ['id3', 'id4'],
    };
    const markDirtyKeysMap = {};

    processMarkAndDelete(featureKey, garbageCollectKeysMap, markDirtyKeysMap);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: `[${featureKey}${psi}key1] Garbage Collect`,
      ids: ['id1', 'id2'],
    });
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: `[${featureKey}${psi}key2] Garbage Collect`,
      ids: ['id3', 'id4'],
    });
  });

  it('should dispatch markDirty actions for each key in markDirtyKeysMap', () => {
    const garbageCollectKeysMap = {};
    const markDirtyKeysMap = {
      key1: ['id1', 'id2'],
      key2: ['id3', 'id4'],
    };

    processMarkAndDelete(featureKey, garbageCollectKeysMap, markDirtyKeysMap);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: `[${featureKey}${psi}key1] Mark Dirty`,
      ids: ['id1', 'id2'],
    });
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: `[${featureKey}${psi}key2] Mark Dirty`,
      ids: ['id3', 'id4'],
    });
  });

  it('should not dispatch any actions if garbageCollectKeysMap and markDirtyKeysMap are empty', () => {
    const garbageCollectKeysMap = {};
    const markDirtyKeysMap = {};

    processMarkAndDelete(featureKey, garbageCollectKeysMap, markDirtyKeysMap);

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
});
