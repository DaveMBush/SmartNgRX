import { MarkAndDeleteInit } from '../types/mark-and-delete-init.interface';

/**
 * Used internally to resolve the remove time to ensure it is always
 * greater than the mark dirty time.
 *
 * @param init The mark and delete init object
 * @returns The correct remove time
 */
export function resolveRemoveTime(init: MarkAndDeleteInit): number {
  let removeTime = init.removeTime;
  if (
    removeTime > 0 &&
    removeTime < init.markDirtyTime &&
    init.markDirtyTime > -1
  ) {
    removeTime = init.markDirtyTime * 2; // 30 minutes
  }
  return removeTime;
}
