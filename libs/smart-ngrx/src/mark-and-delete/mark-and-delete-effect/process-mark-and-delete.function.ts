import { actionServiceRegistry } from '../../registrations/action-service-registry.class';
import { globalMarkAndDeleteInit } from '../global-mark-and-delete-init.class';

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
  featureKey: string,
  entity: string,
  garbageCollectRowIds: string[],
  markDirtyRowIds: string[],
) {
  requestIdleCallback(
    function processMarkAndDeleteCallback() {
      const actionService = actionServiceRegistry.register(featureKey, entity);
      if (garbageCollectRowIds.length > 0) {
        actionService.garbageCollect(garbageCollectRowIds);
      }
      if (markDirtyRowIds.length > 0) {
        actionService.markDirty(markDirtyRowIds);
      }
    },
    {
      timeout: globalMarkAndDeleteInit.get().runInterval! - 100,
    },
  );
}
