import { createEntityAdapter } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { psi } from '../common/theta.const';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

const entityDefinitionMap = new Map<
  string,
  SmartEntityDefinition<SmartNgRXRowBase>
>();

/**
 * This registers the adapter for the entity definition.
 *
 * @param featureName the feature the entity belongs to
 * @param entityName the entity name to register the adapter for
 * @param entityDefinition the entity definition to register the adapter for
 * @returns the entity definition
 *
 * @see `EntityDefinition`
 */
export function entityDefinitionCache(
  featureName: string,
  entityName: string,
  entityDefinition?: SmartEntityDefinition<SmartNgRXRowBase>,
): SmartEntityDefinition<SmartNgRXRowBase> {
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
  return cached;
}
