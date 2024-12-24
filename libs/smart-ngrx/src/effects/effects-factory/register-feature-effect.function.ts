import { inject, InjectionToken } from '@angular/core';
import { of } from 'rxjs';

import { effectServiceRegistry } from '../../registrations/effect-service-registry.class';
import { featureRegistry } from '../../registrations/feature-registry.class';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { EffectService } from '../effect-service';

/**
 * Registers a feature with the feature registry.
 *
 * @param feature The feature to register
 * @param effectsServiceToken The token to use to get the effect service
 * @returns An effect that will register the feature
 */
export function registerFeatureEffect(
  feature: string,
  effectsServiceToken: InjectionToken<EffectService<SmartNgRXRowBase>>,
) {
  let registered = false;
  let featureRegistered = false;
  return function registerFeatureEffectFunction(
    effectService = inject(effectsServiceToken),
  ) {
    if (registered) {
      return of({});
    }
    if (!featureRegistered) {
      featureRegistry.registerFeature(feature);
      featureRegistered = true;
    }
    effectServiceRegistry.register(effectsServiceToken, effectService);

    registered = true;
    return of({});
  };
}
