// jscpd:ignore-start
// this is similar to the classic NgRX version
// but it is unique enough that we can't
// combine without tightly coupling the two
// which will end up in separate libraries.
import { EnvironmentProviders, Provider } from '@angular/core';
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
} from '@smarttools/core';

import { SignalsFacade } from '../signal-facade/signals-facade';

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
 * Returns an empty array if there are no reducers (e.g., when using signals).
 *
 * @see `EntityDefinition`
 */
export function provideSmartFeatureSignalEntities(
  featureName: string,
  entityDefinitions: SmartEntityDefinition<SmartNgRXRowBase>[],
): EnvironmentProviders | Provider[] {
  forNext(
    entityDefinitions,
    function provideSmartFeatureEntitiesForNext(entityDefinition) {
      entityDefinitionRegistry(
        featureName,
        entityDefinition.entityName,
        entityDefinition,
        true,
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

      void unpatchedPromise
        .resolve()
        .then(function provideSmartFeatureEntitiesUnpatchedPromiseThen() {
          delayedRegisterEntity(featureName, entityName, entityDefinition);
          facadeRegistry.register(featureName, entityName, SignalsFacade);
        });
    },
  );
  return [];
}
// jscpd:ignore-end
