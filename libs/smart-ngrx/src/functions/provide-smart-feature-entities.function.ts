import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EffectsModule, FunctionalEffect } from '@ngrx/effects';
import { EntityState } from '@ngrx/entity';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { interval, map, takeWhile } from 'rxjs';

import { forNext } from '../common/for-next.function';
import { effectsFactory } from '../effects/effects-factory.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { reducerFactory } from '../reducers/reducer.factory';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { delayedRegisterEntity } from './delayed-register-entity.function';
import { registerAdapterForDefinition } from './register-adapter-for-definition.function';

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
export function provideSmartFeatureEntities<F extends string>(
  featureName: StringLiteralSource<F>,
  entityDefinitions: SmartEntityDefinition<SmartNgRXRowBase>[],
): EnvironmentProviders {
  const allEffects: Record<string, FunctionalEffect>[] = [];
  const reducers: Record<
    string,
    ActionReducer<EntityState<SmartNgRXRowBase>>
  > = {};
  forNext(entityDefinitions, (entityDefinition) => {
    registerAdapterForDefinition(featureName, entityDefinition);
    const { entityName, effectServiceToken, defaultRow } = entityDefinition;
    const effects = effectsFactory(
      featureName,
      entityName as StringLiteralSource<string>,
      effectServiceToken,
    );
    allEffects.push(effects);
    const reducer = reducerFactory(
      featureName,
      entityName as StringLiteralSource<string>,
      defaultRow,
    );
    reducers[entityName] = reducer;
    interval(1)
      .pipe(
        map(() =>
          delayedRegisterEntity(featureName, entityName, entityDefinition),
        ),
        takeWhile((t) => t),
      )
      .subscribe();
  });
  return importProvidersFrom(
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature(allEffects),
  );
}
