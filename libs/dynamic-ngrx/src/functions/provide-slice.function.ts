import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';
import { FunctionalEffect, provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { EffectService } from '../effects/effect-service';
import { effectsFactory } from '../effects/effects.factory';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { reducerFactory } from '../reducers/reducer.factory';

/**
 * This provides all the NgRX parts for a given feature and entity
 *
 * Note: the generic parameters are implied so they are not documented
 * here.
 *
 * ## Usage:
 * ``` typescript
 *   providers: [
 *     ...
 *     provideSlice('list', 'todo', todoService),
 *     ...
 *   ],
 * ```
 * @param featureName - This is the name you would use for forFeature()
 * in standard NgRX code.
 * @param entityName - The is the name of the entity you are creating.
 * @param effectServiceToken - The token for the service the effects
 * of this entity will call to access the server.
 * @param defaultRow - The default row function to use to create
 * a new row for ids that are missing.
 * @returns `EnvironmentProviders` that will get used to provide the NgRX reducer and effect for this slice.
 */
export function provideSlice<Feature extends string, Source extends string, T>(
  featureName: StringLiteralSource<Feature>,
  entityName: StringLiteralSource<Source>,
  effectServiceToken: InjectionToken<EffectService<T>>,
  defaultRow: (id: string) => T,
): EnvironmentProviders {
  const effects = effectsFactory<Source, T>(entityName, effectServiceToken);
  const reducer = reducerFactory<Source, T>(entityName, defaultRow);

  const providers: (EnvironmentProviders | Provider)[] = [];
  // We strongly type this but provideEffects wants a Record<string, FunctionalEffect>
  providers.push(
    provideEffects(castTo<Record<string, FunctionalEffect>>(effects)),
  );
  providers.push(provideState(featureName, reducer));
  return makeEnvironmentProviders(providers);
}
