import { take } from 'rxjs';

import { castTo } from '../common/cast-to.function';
import { store } from '../selector/store.function';

/**
 * Checks to see if a feature is available in the store
 *
 * @param feature The feature to check for
 * @returns true if the feature is available, false otherwise
 */
export function hasFeature(feature: string) {
  let isFeatureAvailable = false;
  store()
    .select((state) => state)
    .pipe(take(1))
    .subscribe((rootState) => {
      if (castTo<Record<string, unknown>>(rootState)[feature] !== undefined) {
        isFeatureAvailable = true;
      }
    });
  return isFeatureAvailable;
}
