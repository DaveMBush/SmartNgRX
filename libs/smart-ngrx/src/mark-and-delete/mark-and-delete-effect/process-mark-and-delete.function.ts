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
 * @param entity the entity we are looking at
 * @param garbageCollectRowIds items that need to be garbage collected
 * @param markDirtyRowIds items that need to be marked dirty
 */
export function processMarkAndDelete(
  featureKey: StringLiteralSource<string>,
  entity: StringLiteralSource<string>,
  garbageCollectRowIds: string[],
  markDirtyRowIds: string[],
) {
  requestIdleCallback(
    () => {
      const store = storeFunction();
      assert(
        !isNullOrUndefined(store),
        'could not find store from store function',
      );
      const entityAction = actionFactory(featureKey, entity);
      if (garbageCollectRowIds.length > 0) {
        store!.dispatch(
          entityAction.garbageCollect({ ids: garbageCollectRowIds }),
        );
      }
      if (markDirtyRowIds.length > 0) {
        store!.dispatch(entityAction.markDirty({ ids: markDirtyRowIds }));
      }
    },
    { timeout: getGlobalMarkAndDeleteInit().runInterval! - 100 },
  );
}
