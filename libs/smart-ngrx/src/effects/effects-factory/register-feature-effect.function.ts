import { of } from 'rxjs';

import { featureRegistry } from '../../registrations/feature-registry.class';

/**
 * Registers a feature with the feature registry.
 *
 * @param feature The feature to register
 * @returns An effect that will register the feature
 */
export function registerFeatureEffect(feature: string) {
  let registered = false;
  return () => {
    if (registered) {
      return of({});
    }
    featureRegistry.registerFeature(feature);
    registered = true;
    return of({});
  };
}
