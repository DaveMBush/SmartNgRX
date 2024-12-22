import { InjectionToken } from '@angular/core';
import { createEffect, EffectConfig, FunctionalEffect } from '@ngrx/effects';

import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { EffectService } from './effect-service';
import { registerFeatureEffect } from './effects-factory/register-feature-effect.function';

const dispatchFalse = {
  dispatch: false,
  functional: true,
} as EffectConfig & {
  functional: true;
  dispatch: false;
};

type EffectsFactoryKeys =
  | 'registerFeature';

/**
 * The effects factory creates a new set of effects for the
 * `Action` source provided and calls the service represented
 * by the `InjectionToken` provided.
 *
 * @param feature the feature name this effect is being run for
 * @param effectsServiceToken The token for the service that
 *   the resulting effect will call.
 * @returns The NgRX effects for the source provided
 *
 * @see `EffectsFactory`
 * @see `EffectService`
 */
export function effectsFactory<T extends SmartNgRXRowBase>(
  feature: string,
  effectsServiceToken: InjectionToken<EffectService<T>>,
): Record<EffectsFactoryKeys, FunctionalEffect> {
  return {
    registerFeature: createEffect(
      registerFeatureEffect(feature, effectsServiceToken),
      dispatchFalse,
    ),
  };
}
