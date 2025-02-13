import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { ActionReducer, StoreModule } from '@ngrx/store';

import { forNext } from '../common/for-next.function';
import { rootInjector } from '../common/root-injector.function';
import { zoneless } from '../common/zoneless.function';
import { reducerFactory } from '../reducers/reducer.factory';
import { entityDefinitionRegistry } from '../registrations/entity-definition-registry.function';
import { featureRegistry } from '../registrations/feature-registry.class';
import { serviceRegistry } from '../registrations/service-registry.class';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { delayedRegisterEntity } from './delayed-register-entity.function';

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
 * provideSmartFeatureEntities('someFeature', entityDefinitions),
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
  const reducers: Record<
    string,
    ActionReducer<EntityState<SmartNgRXRowBase>>
  > = {};

  forNext(
    entityDefinitions,
    function provideSmartFeatureEntitiesForNext(entityDefinition) {
      entityDefinitionRegistry(
        featureName,
        entityDefinition.entityName,
        entityDefinition,
      );
      const { entityName, effectServiceToken } = entityDefinition;
      if (!featureRegistry.hasFeature(featureName)) {
        featureRegistry.registerFeature(featureName);
      }

      rootInjector.runOnRootInjector(function registerFeature() {
        if (!serviceRegistry.has(effectServiceToken)) {
          serviceRegistry.register(
            effectServiceToken,
            rootInjector.get().get(effectServiceToken),
          );
        }
      });

      const reducer = reducerFactory(featureName, entityName);
      reducers[entityName] = reducer;

      void unpatchedPromise
        .resolve()
        .then(function provideSmartFeatureEntitiesUnpatchedPromiseThen() {
          delayedRegisterEntity(featureName, entityName, entityDefinition);
        });
    },
  );

  return importProvidersFrom(StoreModule.forFeature(featureName, reducers));
}
