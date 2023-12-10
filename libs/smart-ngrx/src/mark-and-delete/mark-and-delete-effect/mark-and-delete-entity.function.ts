import { getEntityRegistry } from '../..';
import { psi } from '../../common/theta.const';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
import { processMarkAndDelete } from './process-mark-and-delete.function';

/**
 * used by mark-and-delete.effect.ts to mark a row dirty
 *
 * @param root0 the tuple that holds the feature and the entity
 * @param root0."0" the feature we are processing
 * @param root0."1" the entity we are processing
 */
export function markAndDeleteEntity([feature, entity]: [
  StringLiteralSource<string>,
  StringLiteralSource<string>,
]): void {
  const registry = getEntityRegistry(feature, entity);
  const entityMap = registry.markAndDeleteEntityMap;
  const featureInit = registry.markAndDeleteInit;
  const garbageCollectKeysMap: Record<string, string[] | undefined> = {};
  const markDirtyKeysMap: Record<string, string[] | undefined> = {};
  const now = Date.now();
  for (const [key, value] of entityMap) {
    // this is not adequately covering the case where removeTime is 0
    // but we have already tested for markDirtyTime so the record is dirty
    // but not visible.
    // we also seem to be sending markDirty message every time between when
    // we need to mark it dirty and when we need to remove it.
    // there must be a more efficient way to do this!
    // - Don't do any check between dirty time and remove time accounting for
    //   interval time. (use 2x interval time as a buffer)
    // - Need to change only the input to be partial and everywhere else
    //   to have a default value so we can remove the null/undefined checks.
    if (
      0 === featureInit.removeTime &&
      value < now - featureInit.markDirtyTime * 2
    ) {
      continue;
    }
    if (featureInit.removeTime > 0 && value < now - featureInit.removeTime) {
      const splitKey = key.split(psi);
      garbageCollectKeysMap[splitKey[0]] =
        garbageCollectKeysMap[splitKey[0]] || [];
      garbageCollectKeysMap[splitKey[0]]!.push(splitKey[1]);
    } else if (
      featureInit.markDirtyTime > 0 &&
      value < now - featureInit.markDirtyTime
    ) {
      const splitKey = key.split(psi);
      markDirtyKeysMap[splitKey[0]] = markDirtyKeysMap[splitKey[0]] || [];
      markDirtyKeysMap[splitKey[0]]!.push(splitKey[1]);
    } else {
      break;
    }
  }
  processMarkAndDelete(
    feature as StringLiteralSource<string>,
    garbageCollectKeysMap,
    markDirtyKeysMap,
  );
}
