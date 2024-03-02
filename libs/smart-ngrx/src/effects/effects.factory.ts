import { InjectionToken } from '@angular/core';
import { createEffect, FunctionalEffect } from '@ngrx/effects';

import { castTo } from '../common/cast-to.function';
import { actionFactory } from '../functions/action.factory';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { EffectService } from './effect-service';
import { loadByIdsEffect } from './effects-factory/load-by-ids-effect.function';
import { loadByIdsPreloadEffect } from './effects-factory/load-by-ids-preload-effect.function';
import { loadEffect } from './effects-factory/load-effect.function';
import { updateEffect } from './effects-factory/update-effect.function';

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
  const actions = actionFactory<F, E, T>(feature, entityName);
  return castTo<Record<string, FunctionalEffect>>({
    load: createEffect(loadEffect(effectsServiceToken, actions), {
      functional: true,
    }),
    loadByIdsPreload: createEffect(loadByIdsPreloadEffect(actions), {
      functional: true,
    }),
    loadByIds: createEffect(loadByIdsEffect(effectsServiceToken, actions), {
      functional: true,
    }),
    update: createEffect(updateEffect(effectsServiceToken, actions), {
      functional: true,
    }),
  });
}
