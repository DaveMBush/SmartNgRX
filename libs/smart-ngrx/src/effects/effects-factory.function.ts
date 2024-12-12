import { InjectionToken } from '@angular/core';
import { createEffect, EffectConfig, FunctionalEffect } from '@ngrx/effects';

import { actionFactory } from '../actions/action.factory';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { EffectService } from './effect-service';
import { addEffect } from './effects-factory/add-effect.function';
import { addSuccessEffect } from './effects-factory/add-success-effect.function';
import { registerFeatureEffect } from './effects-factory/register-feature-effect.function';
import { updateEffect } from './effects-factory/update-effect.function';

const dispatchFalse = {
  dispatch: false,
  functional: true,
} as EffectConfig & {
  functional: true;
  dispatch: false;
};

const dispatchTrue = {
  functional: true,
} as EffectConfig & {
  functional: true;
  dispatch: true;
};

type EffectsFactoryKeys =
  | 'add'
  | 'addSuccess'
  | 'registerFeature'
  | 'update';

/**
 * The effects factory creates a new set of effects for the
 * `Action` source provided and calls the service represented
 * by the `InjectionToken` provided.
 *
 * @param feature the feature name this effect is being run for
 * @param entityName the entity within the feature this effect is being run for
 * @param effectsServiceToken The token for the service that
 *   the resulting effect will call.
 * @returns The NgRX effects for the source provided
 *
 * @see `EffectsFactory`
 * @see `EffectService`
 */
export function effectsFactory<T extends SmartNgRXRowBase>(
  feature: string,
  entityName: string,
  effectsServiceToken: InjectionToken<EffectService<T>>,
): Record<EffectsFactoryKeys, FunctionalEffect> {
  const actions = actionFactory<T>(feature, entityName);
  const entityDefinition = entityDefinitionCache<T>(feature, entityName);
  const adapter = entityDefinition.entityAdapter;
  return {
    /**
     * Ends up calling the `EffectService` to update the row specified
     * by the row in the action.
     */
    update: createEffect(
      updateEffect<T>(effectsServiceToken, actions, feature, entityName),
      dispatchFalse,
    ),
    /**
     * Ends up calling the `EffectService` to add the row specified
     * by the row in the action.
     */
    add: createEffect(addEffect(effectsServiceToken, actions), dispatchTrue),
    /**
     * Handles adding the new row to the store and removing the dummy row
     * that was added so we could edit it.
     */
    addSuccess: createEffect(
      addSuccessEffect<T>(actions, adapter),
      dispatchFalse,
    ),
    registerFeature: createEffect(
      registerFeatureEffect(feature),
      dispatchFalse,
    ),
  };
}
