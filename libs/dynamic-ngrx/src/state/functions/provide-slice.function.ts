import { EnvironmentProviders, InjectionToken, Provider, makeEnvironmentProviders } from '@angular/core';
import { StringLiteralSource } from './string-literal-source.type';
import { effectsFactory } from './effects.factory';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { reducerFactory } from './reducer.factory';
import { EffectService } from './effect-service.interface';

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

