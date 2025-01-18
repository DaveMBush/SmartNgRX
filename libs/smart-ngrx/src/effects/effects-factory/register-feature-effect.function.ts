import { inject, InjectionToken } from '@angular/core';
import { of } from 'rxjs';

import { effectServiceRegistry } from '../../registrations/effect-service-registry.class';
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
  return function registerFeatureEffectFunction(
    effectService = inject(effectsServiceToken),
  ) {
    if (effectServiceRegistry.has(effectsServiceToken)) {
      return of({});
    }
    effectServiceRegistry.register(effectsServiceToken, effectService);

    return of({});
  };
}
