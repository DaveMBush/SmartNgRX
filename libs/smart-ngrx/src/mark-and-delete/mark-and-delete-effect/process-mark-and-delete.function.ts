import { actionFactory } from '../..';
import { assert } from '../../common/assert.function';
import { isNullOrUndefined } from '../../common/is-null-or-undefined.function';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
import { store as storeFunction } from '../../selector/store.function';
import { getGlobalMarkAndDeleteInit } from '../mark-and-delete-init';

/**
 * Goes through all the rows that have been registered and marks them
 * as dirty or garbage collects them as needed.
 *
 * @param featureKey the key we are looking at
 * @param garbageCollectKeysMap items that need to be garbage collected
 * @param markDirtyKeysMap items that need to be marked dirty
 */
export function processMarkAndDelete(
  featureKey: StringLiteralSource<string>,
  garbageCollectKeysMap: Record<string, string[] | undefined>,
  markDirtyKeysMap: Record<string, string[] | undefined>,
) {
  requestIdleCallback(
    () => {
      const store = storeFunction();
      assert(
        !isNullOrUndefined(store),
        'could not find store from store function',
      );
      Object.keys(garbageCollectKeysMap)
        .filter(
          (key) =>
            !isNullOrUndefined(garbageCollectKeysMap[key]) &&
            garbageCollectKeysMap[key]!.length,
        )
        .forEach((key) => {
          const featureAction = actionFactory(
            featureKey,
            key as StringLiteralSource<typeof key>,
          );
          store!.dispatch(
            featureAction.garbageCollect({ ids: garbageCollectKeysMap[key]! }),
          );
        });
      Object.keys(markDirtyKeysMap)
        .filter(
          (key) =>
            !isNullOrUndefined(markDirtyKeysMap[key]) &&
            markDirtyKeysMap[key]!.length,
        )
        .forEach((key) => {
          const featureAction = actionFactory(
            featureKey,
            key as StringLiteralSource<typeof key>,
          );
          store!.dispatch(
            featureAction.markDirty({ ids: markDirtyKeysMap[key]! }),
          );
        });
    },
    { timeout: getGlobalMarkAndDeleteInit().runInterval - 100 },
  );
}
