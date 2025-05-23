// jscpd:ignore-start
// this is similar to the signal version
// but it is unique enough that we can't
// combine without tightly coupling the two
// which will end up in separate libraries.
import {
  EnvironmentProviders,
  importProvidersFrom,
  Provider,
} from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { ActionReducer, StoreModule } from '@ngrx/store';
import {
  delayedRegisterEntity,
  entityDefinitionRegistry,
  facadeRegistry,
  featureRegistry,
  forNext,
  rootInjector,
  serviceRegistry,
  SmartEntityDefinition,
  SmartNgRXRowBase,
  zoneless,
} from '@smarttools/smart-core';

import { ClassicNgrxFacade } from '../classic-ngrx.facade/classic-ngrx.facade';
import { reducerFactory } from '../reducers/reducer.factory';

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
export function provideSmartFeatureClassicEntities(
  featureName: string,
  entityDefinitions: SmartEntityDefinition<SmartNgRXRowBase>[],
): EnvironmentProviders | Provider[] {
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

      // equivalent for signals is going to be a signalService
      // with the same interface as the actionService
      const reducer = reducerFactory(featureName, entityName);
      reducers[entityName] = reducer;

      void unpatchedPromise
        .resolve()
        .then(function provideSmartFeatureEntitiesUnpatchedPromiseThen() {
          delayedRegisterEntity(featureName, entityName, entityDefinition);
          facadeRegistry.register(featureName, entityName, ClassicNgrxFacade);
        });
    },
  );
  return importProvidersFrom(StoreModule.forFeature(featureName, reducers));
}
// jscpd:ignore-end
