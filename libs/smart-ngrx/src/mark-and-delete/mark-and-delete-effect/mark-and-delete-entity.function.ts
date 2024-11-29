import { entityRegistry } from '../../registrations/entity-registry.class';
import { globalMarkAndDeleteInit } from '../global-mark-and-delete-init.class';
import { processMarkAndDelete } from './process-mark-and-delete.function';

/**
 * used by mark-and-delete.effect.ts to mark a row dirty
 *
 * @param root0 the tuple that holds the feature and the entity
 * @param root0."0" the feature we are processing
 * @param root0."1" the entity we are processing
 */
export function markAndDeleteEntity([feature, entity]: [string, string]): void {
  const registry = entityRegistry.get(feature, entity);
  const entityMap = registry.markAndDeleteEntityMap;
  const featureInit = registry.markAndDeleteInit;
  const garbageCollectRowIds: string[] = [];
  const markDirtyRowIds: string[] = [];
  const now = Date.now();
  const runInterval = globalMarkAndDeleteInit.get().runInterval!;
  for (const [key, value] of entityMap) {
    if (
      1 > featureInit.removeTime &&
      value < now - (featureInit.markDirtyTime + runInterval)
    ) {
      continue;
    }
    if (featureInit.removeTime > 0 && value < now - featureInit.removeTime) {
      garbageCollectRowIds.push(key);
    } else if (
      featureInit.markDirtyTime > 0 &&
      value < now - featureInit.markDirtyTime &&
      value > now - featureInit.markDirtyTime - runInterval
    ) {
      markDirtyRowIds.push(key);
    } else {
      break;
    }
  }
  processMarkAndDelete(feature, entity, garbageCollectRowIds, markDirtyRowIds);
}
