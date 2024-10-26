import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EffectsModule, FunctionalEffect } from '@ngrx/effects';
import { EntityState } from '@ngrx/entity';
import { ActionReducer, StoreModule } from '@ngrx/store';

import { forNext } from '../common/for-next.function';
import { zoneless } from '../common/zoneless.function';
import { effectsFactory } from '../effects/effects-factory.function';
import { reducerFactory } from '../reducers/reducer.factory';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { delayedRegisterEntity } from './delayed-register-entity.function';
import { provideWatchInitialRowEffect } from './provide-watch-initial-row-effect.function';

const unpatchedPromise = zoneless('Promise') as typeof Promise;

/**
 * This provides all the NgRX parts for a given feature and entity
 *
 * Note: the generic parameters are implied so they are not documented
 * here.
 *
 * ## Usage:
 * ``` typescript
 * providers: [
 * ...
 * provideEntities('someFeature', entityDefinitions),
 * ...
 * ],
 * ```
 *
 * @param featureName This is the name you would use for forFeature()
 * in standard NgRX code.
 * @param entityDefinitions An array of entity definitions.
 * @returns `EnvironmentProviders` that will get used to provide the NgRX reducer and effect for this slice.
 *
 * @see `EntityDefinition`
 */
export function provideSmartFeatureEntities(
  featureName: string,
  entityDefinitions: SmartEntityDefinition<SmartNgRXRowBase>[],
): EnvironmentProviders {
  const allEffects: Record<string, FunctionalEffect>[] = [];
  const reducers: Record<
    string,
    ActionReducer<EntityState<SmartNgRXRowBase>>
  > = {};
  forNext(entityDefinitions, (entityDefinition) => {
    entityDefinitionCache(
      featureName,
      entityDefinition.entityName,
      entityDefinition,
    );
    const { entityName, effectServiceToken } = entityDefinition;
    const effects = effectsFactory(featureName, entityName, effectServiceToken);
    provideWatchInitialRowEffect(
      entityDefinition,
      effects,
      featureName,
      entityName,
    );

    allEffects.push(effects);
    const reducer = reducerFactory(featureName, entityName);
    reducers[entityName] = reducer;
    void unpatchedPromise.resolve().then(() => {
      delayedRegisterEntity(featureName, entityName, entityDefinition);
    });
  });
  return importProvidersFrom(
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature(allEffects),
  );
}
