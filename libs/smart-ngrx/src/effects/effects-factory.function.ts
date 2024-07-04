import { InjectionToken } from '@angular/core';
import { createEffect, EffectConfig, FunctionalEffect } from '@ngrx/effects';

import { actionFactory } from '../actions/action.factory';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { EffectService } from './effect-service';
import { addEffect } from './effects-factory/add-effect.function';
import { addSuccessEffect } from './effects-factory/add-success-effect.function';
import { deleteEffect } from './effects-factory/delete-effect.function';
import { loadByIdsEffect } from './effects-factory/load-by-ids-effect.function';
import { loadByIdsPreloadEffect } from './effects-factory/load-by-ids-preload-effect.function';
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
  | 'delete'
  | 'loadByIds'
  | 'loadByIdsPreload'
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
     * Ends up calling the `EffectService` to delete the row specified
     * by the ID in the action.
     */
    delete: createEffect(
      deleteEffect(effectsServiceToken, actions),
      dispatchFalse,
    ),
    /**
     * Ends up calling the `EffectService` to determine what rows
     * need to be loaded yet and returns dummy rows for those rows.
     */
    loadByIdsPreload: createEffect(
      loadByIdsPreloadEffect(feature, entityName, actions),
      dispatchFalse,
    ),
    /**
     * Ends up calling the `EffectService` to load the rows specified
     * from the server.
     */
    loadByIds: createEffect(
      loadByIdsEffect(effectsServiceToken, actions, feature, entityName),
      dispatchFalse,
    ),
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
      addSuccessEffect<T>(effectsServiceToken, actions, adapter),
      dispatchFalse,
    ),
  };
}
