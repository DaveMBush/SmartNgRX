/* eslint-disable @typescript-eslint/no-explicit-any -- any needed to get past the literal guard */
import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EffectsModule, FunctionalEffect } from '@ngrx/effects';
import { EntityState } from '@ngrx/entity';
import { ActionReducer, StoreModule } from '@ngrx/store';

import { effectsFactory } from '../effects/effects.factory';
import {
  getMarkAndDeleteInit,
  registerMarkAndDeleteInit,
} from '../mark-and-delete/mark-and-delete-init';
import { reducerFactory } from '../reducers/reducer.factory';
import { EntityDefinition } from '../types/entity-definition.interface';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { registerEntity } from './register-entity.function';

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
 *     provideEntities('someFeature', entityDefinitions),
 *     ...
 *   ],
 * ```
 * @param featureName This is the name you would use for forFeature()
 * in standard NgRX code.
 * @param entityDefinitions An array of entity definitions.
 * @returns `EnvironmentProviders` that will get used to provide the NgRX reducer and effect for this slice.
 *
 * @see `EntityDefinition`
 */
export function provideSmartFeatureEntities(
  featureName: string,
  entityDefinitions: EntityDefinition<MarkAndDelete>[],
): EnvironmentProviders {
  const allEffects: Record<string, FunctionalEffect>[] = [];
  const reducers: Record<
    string,
    ActionReducer<EntityState<MarkAndDelete>>
  > = {};
  entityDefinitions.forEach((entityDefinition) => {
    const { fieldName, effectServiceToken, defaultRow } = entityDefinition;
    const store = featureName + ':' + fieldName;
    const effects = effectsFactory(store as any, effectServiceToken);
    allEffects.push(effects);
    const reducer = reducerFactory(featureName, store as any, defaultRow);
    reducers[fieldName] = reducer;
    registerEntity(featureName, fieldName, {
      defaultRow: entityDefinition.defaultRow,
    });
    const global = getMarkAndDeleteInit(`θglobalθ`);
    registerMarkAndDeleteInit(
      `${featureName}:${fieldName}`,
      entityDefinition.markAndDelete ?? global,
    );
  });
  return importProvidersFrom(
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature(allEffects),
  );
}
