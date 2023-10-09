/* eslint-disable @typescript-eslint/no-explicit-any -- any needed to get past the literal guard */
import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EffectsModule, FunctionalEffect } from '@ngrx/effects';
import { EntityState } from '@ngrx/entity';
import { ActionReducer, StoreModule } from '@ngrx/store';

import { effectsFactory } from '../effects/effects.factory';
import { reducerFactory } from '../reducers/reducer.factory';
import { EntityDefinition } from '../types/entity-definition.interface';
import { MarkAndDelete } from '../types/mark-and-delete.interface';

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
 *     provideEntity('list', 'todo', todoService, defaultTodoRow),
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
    const reducer = reducerFactory(store as any, defaultRow);
    reducers[fieldName] = reducer;
  });
  // return makeEnvironmentProviders([
  //   provideState(featureName, reducers),
  //   provideEffects(effects),
  // ]);
  return importProvidersFrom(
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature(allEffects),
  );
}
