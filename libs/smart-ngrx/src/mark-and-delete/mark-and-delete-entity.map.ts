import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { psi } from '../common/theta.const';

const markAndDelete: Record<string, Map<string, number>> = {};

/**
 * retrieves the mark and delete map for the feature
 *
 * @param feature the feature to retrieve
 * @param entity the entity within the feature to retrieve
 * @returns the Map of record keys to the last time they were marked dirty
 */
export function getMarkAndDeleteEntityMap(
  feature: string,
  entity: string,
): Map<string, number> {
  const key = `${feature}${psi}${entity}`;
  if (isNullOrUndefined(markAndDelete[key])) {
    markAndDelete[key] = new Map<string, number>();
  }
  return markAndDelete[key];
}

/**
 * returns the features that have been registered with markAndDelete
 *
 * @returns the features that have been registered with markAndDelete
 */
export function markAndDeleteEntities(): string[] {
  return Object.keys(markAndDelete);
}
