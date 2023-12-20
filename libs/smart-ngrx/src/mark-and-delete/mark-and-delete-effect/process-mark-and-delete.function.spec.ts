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
  const entityKey = 'entity' as StringLiteralSource<string>;

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
    const garbageCollectKeysArray = ['id1', 'id2'];
    const markDirtyKeysArray: string[] = [];

    processMarkAndDelete(
      featureKey,
      entityKey,
      garbageCollectKeysArray,
      markDirtyKeysArray,
    );

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: `[${featureKey}${psi}${entityKey}] Garbage Collect`,
      ids: ['id1', 'id2'],
    });
  });

  it('should dispatch markDirty actions for each key in markDirtyKeysMap', () => {
    const garbageCollectKeysArray: string[] = [];
    const markDirtyKeysArray = ['id1', 'id2'];

    processMarkAndDelete(
      featureKey,
      entityKey,
      garbageCollectKeysArray,
      markDirtyKeysArray,
    );

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: `[${featureKey}${psi}${entityKey}] Mark Dirty`,
      ids: ['id1', 'id2'],
    });
  });

  it('should not dispatch any actions if garbageCollectKeysMap and markDirtyKeysMap are empty', () => {
    const garbageCollectKeysArray: string[] = [];
    const markDirtyKeysArray: string[] = [];

    processMarkAndDelete(
      featureKey,
      entityKey,
      garbageCollectKeysArray,
      markDirtyKeysArray,
    );

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
});
