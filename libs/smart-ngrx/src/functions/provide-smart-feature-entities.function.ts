/* eslint-disable @typescript-eslint/no-explicit-any -- any needed to get past the literal guard */
import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EffectsModule, FunctionalEffect } from '@ngrx/effects';
import { EntityState } from '@ngrx/entity';
import { ActionReducer, StoreModule } from '@ngrx/store';

import { effectsFactory } from '../effects/effects.factory';
import { getMarkAndDeleteEntityMap } from '../mark-and-delete/mark-and-delete-entity.map';
import { getGlobalMarkAndDeleteInit } from '../mark-and-delete/mark-and-delete-init';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { reducerFactory } from '../reducers/reducer.factory';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { registerEntity } from './register-entity.function';

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
  entityDefinitions: SmartEntityDefinition<MarkAndDelete>[],
): EnvironmentProviders {
  const allEffects: Record<string, FunctionalEffect>[] = [];
  const reducers: Record<
    string,
    ActionReducer<EntityState<MarkAndDelete>>
  > = {};
  entityDefinitions.forEach((entityDefinition) => {
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
    const globalInit = getGlobalMarkAndDeleteInit();
    const init = { ...globalInit, ...entityDefinition.markAndDelete };
    if (init.removeTime! < init.markDirtyTime! && init.markDirtyTime! > -1) {
      init.removeTime = init.markDirtyTime! * 2; // 30 minutes
    }

    registerEntity(featureName, entityName, {
      defaultRow: entityDefinition.defaultRow,
      markAndDeleteInit: init,
      markAndDeleteEntityMap: getMarkAndDeleteEntityMap(
        featureName,
        entityName,
      ),
    });
  });
  return importProvidersFrom(
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature(allEffects),
  );
}
