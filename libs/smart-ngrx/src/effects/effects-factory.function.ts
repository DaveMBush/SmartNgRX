import { InjectionToken } from '@angular/core';
import { createEffect, EffectConfig, FunctionalEffect } from '@ngrx/effects';
import { EntityAdapter } from '@ngrx/entity';

import { actionFactory } from '../actions/action.factory';
import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { EffectService } from './effect-service';
import { addEffect } from './effects-factory/add-effect.function';
import { addSuccessEffect } from './effects-factory/add-success-effect.function';
import { deleteEffect } from './effects-factory/delete-effect.function';
import { loadByIdsEffect } from './effects-factory/load-by-ids-effect.function';
import { loadByIdsPreloadEffect } from './effects-factory/load-by-ids-preload-effect.function';
import { loadEffect } from './effects-factory/load-effect.function';
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

/**
 * The effects factory creates a new set of effects for the
 * `Action` source provided and calls the service represented
 * by the `InjectionToken` provided.
 *
 * @param feature the feature name this effect is being run for
 * @param entityName the entity within the feature this effect is being run for
 * @param effectsServiceToken The token for the service that
 *   the resulting effect will call.
 * @returns The effect for the source provided
 *
 * @see `EffectsFactory`
 * @see `EffectService`
 */
export function effectsFactory<
  F extends string,
  E extends string,
  T extends SmartNgRXRowBase,
>(
  feature: StringLiteralSource<F>,
  entityName: StringLiteralSource<E>,
  effectsServiceToken: InjectionToken<EffectService<T>>,
): Record<string, FunctionalEffect> {
  const actions = actionFactory<T, F, E>(feature, entityName);
  const adapter = castTo<EntityAdapter<T> | undefined>(
    entityDefinitionCache(feature, entityName).entityAdapter,
  );
  assert(!!adapter, `Missing adapter for ${feature}:${entityName}.`);
  return castTo<Record<string, FunctionalEffect>>({
    delete: createEffect(
      deleteEffect(effectsServiceToken, actions),
      dispatchFalse,
    ),
    load: createEffect(loadEffect(effectsServiceToken, actions), dispatchTrue),
    loadByIdsPreload: createEffect(
      loadByIdsPreloadEffect(feature, entityName, actions),
      dispatchFalse,
    ),
    loadByIds: createEffect(
      loadByIdsEffect(
        effectsServiceToken,
        actions,
        feature as StringLiteralSource<string>,
        entityName as StringLiteralSource<string>,
      ),
      dispatchFalse,
    ),
    update: createEffect(
      updateEffect<T>(
        effectsServiceToken,
        actions,
        feature as StringLiteralSource<string>,
        entityName as StringLiteralSource<string>,
      ),
      dispatchFalse,
    ),
    add: createEffect(addEffect(effectsServiceToken, actions), dispatchTrue),
    addSuccess: createEffect(
      addSuccessEffect(effectsServiceToken, actions, adapter),
      dispatchFalse,
    ),
  });
}
