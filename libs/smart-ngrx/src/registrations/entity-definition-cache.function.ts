import { createEntityAdapter } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { psi } from '../common/psi.const';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { SmartValidatedEntityDefinition } from '../types/smart-validated-entity-definition.type';

const entityDefinitionMap = new Map<
  string,
  SmartEntityDefinition<SmartNgRXRowBase>
>();

/**
 * This registers the adapter for the entity definition.
 *
 * @param featureName the feature the entity belongs to
 * @param entityName the entity name to register the adapter for
 * @param entityDefinition the `SmartEntityDefinition` to register the adapter for
 * @returns the entity definition
 *
 * @see `EntityDefinition`
 */
export function entityDefinitionCache<
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
>(
  featureName: string,
  entityName: string,
  entityDefinition?: SmartEntityDefinition<T>,
): SmartValidatedEntityDefinition<T> {
  let cached = entityDefinitionMap.get(`${featureName}${psi}${entityName}`);
  if (entityDefinition !== undefined) {
    cached = entityDefinition;
    if (entityDefinition.entityAdapter === undefined) {
      entityDefinition.entityAdapter = createEntityAdapter();
    }
    entityDefinitionMap.set(
      `${featureName}${psi}${entityName}`,
      entityDefinition,
    );
  }
  assert(
    !!cached,
    `Entity definition for ${featureName}${psi}${entityName} not found.`,
  );
  const entityAdapter = cached.entityAdapter;
  assert(
    !!entityAdapter,
    `Entity adapter for ${featureName}${psi}${entityName} not found.`,
  );
  // we can cast this now because we've validated that it obeys the type rules
  // and we have to return the typed version instead of the common version
  // we store it as
  return castTo<SmartValidatedEntityDefinition<T>>(cached);
}
