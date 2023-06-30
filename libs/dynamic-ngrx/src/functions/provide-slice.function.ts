import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders,Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { EffectService } from './effect-service';
import { effectsFactory } from './effects.factory';
import { reducerFactory } from './reducer.factory';

export const provideSlice = <Feature extends string, Source extends string,T>(
  featureName: StringLiteralSource<Feature>,
  entityName: StringLiteralSource<Source>,
  effectServiceToken: InjectionToken<EffectService<T>>,
): EnvironmentProviders => {
  const effects = effectsFactory<Source, T>(entityName, effectServiceToken);
  const reducer = reducerFactory<Source, T>(entityName);

  const providers: (EnvironmentProviders | Provider)[] = [];
  providers.push(provideEffects(effects));
  providers.push(provideState(featureName, reducer));
  return  makeEnvironmentProviders(providers);

};

