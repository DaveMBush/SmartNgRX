/* eslint-disable @typescript-eslint/no-explicit-any -- any needed to get past the literal guard */
import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { EntityState } from '@ngrx/entity';
import { ActionReducer, provideState } from '@ngrx/store';

import { EffectService } from '../effects/effect-service';
import { effectsFactory } from '../effects/effects.factory';
import { reducerFactory } from '../reducers/reducer.factory';

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
export function provideEntity<T>(
  featureName: string,
  entityDefinitions: {
    fieldName: string;
    entityName: string;
    effectServiceToken: InjectionToken<EffectService<T>>;
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- if it isn't one rule, its the other
    defaultRow(this: void, id: string): T;
  },
): EnvironmentProviders {
  const { fieldName, entityName, effectServiceToken, defaultRow } =
    entityDefinitions;
  const effects = effectsFactory(entityName as any, effectServiceToken);
  const reducer = reducerFactory(entityName as any, defaultRow);
  const reducers: Record<string, ActionReducer<EntityState<T>>> = {};
  reducers[fieldName] = reducer;
  return makeEnvironmentProviders([
    provideState(featureName, reducers),
    provideEffects(effects),
  ]);
  // return importProvidersFrom(
  //   StoreModule.forFeature(featureName, reducers),
  //   EffectsModule.forFeature([effects])
  // )
}
