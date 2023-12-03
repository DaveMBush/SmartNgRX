import { isNullOrUndefined } from '../common/is-null-or-undefined.function';

export const markAndDelete: Record<string, Map<string, number>> = {};

/**
 * retrieves the mark and delete map for the feature
 *
 * @param feature the feature to retrieve
 * @returns the Map of record keys to the last time they were marked dirty
 */
export function getMarkAndDeleteFeatureMap(
  feature: string,
): Map<string, number> {
  if (isNullOrUndefined(markAndDelete[feature])) {
    markAndDelete[feature] = new Map<string, number>();
  }
  return markAndDelete[feature];
}

/**
 * returns the features that have been registered with markAndDelete
 *
 * @returns the features that have been registered with markAndDelete
 */
export function markAndDeleteFeatures(): string[] {
  return Object.keys(markAndDelete);
}
