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
import { reducerFactory } from './reducer.factory';

export const provideSlice = <Feature extends string, Source extends string, T>(
  featureName: StringLiteralSource<Feature>,
  entityName: StringLiteralSource<Source>,
  effectServiceToken: InjectionToken<EffectService<T>>
): EnvironmentProviders => {
  const effects = effectsFactory<Source, T>(entityName, effectServiceToken);
  const reducer = reducerFactory<Source, T>(entityName);

  const providers: (EnvironmentProviders | Provider)[] = [];
  // We strongly type this but provideEffects wants a Record<string, FunctionalEffect>
  providers.push(
    provideEffects(castTo<Record<string, FunctionalEffect>>(effects))
  );
  providers.push(provideState(featureName, reducer));
  return makeEnvironmentProviders(providers);
};
