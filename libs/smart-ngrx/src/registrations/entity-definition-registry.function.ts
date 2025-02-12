import { createEntityAdapter } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { psi } from '../common/psi.const';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { SmartValidatedEntityDefinition } from '../types/smart-validated-entity-definition.type';

const entityDefinitionMap = new Map<
  string,
  SmartValidatedEntityDefinition<SmartNgRXRowBase>
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
export function entityDefinitionRegistry<
  T extends SmartNgRXRowBase = SmartNgRXRowBase,
>(
  featureName: string,
  entityName: string,
  entityDefinition?: SmartEntityDefinition<T>,
): SmartValidatedEntityDefinition<T> {
  let cached = entityDefinitionMap.get(`${featureName}${psi}${entityName}`);
  if (entityDefinition !== undefined) {
    if (entityDefinition.selectId === undefined) {
      entityDefinition.selectId = function defaultSelectId(row: T) {
        return row.id;
      };
    }
    const entityDefinitionWithAdapter =
      entityDefinition as SmartValidatedEntityDefinition<T>;
    cached =
      entityDefinitionWithAdapter as unknown as SmartValidatedEntityDefinition<SmartNgRXRowBase>;
    if (entityDefinition.isSignal !== true) {
      entityDefinitionWithAdapter.entityAdapter = createEntityAdapter<T>({
        selectId: entityDefinition.selectId,
      });
    }
    entityDefinitionMap.set(`${featureName}${psi}${entityName}`, cached);
  }
  assert(
    !!cached,
    `Entity definition for ${featureName}${psi}${entityName} not found.`,
  );
  const entityAdapter = cached.entityAdapter;
  assert(
    entityAdapter !== undefined,
    `Entity adapter for ${featureName}${psi}${entityName} not found.`,
  );
  // we can cast this now because we've validated that it obeys the type rules
  // and we have to return the typed version instead of the common version
  // we store it as
  return castTo<SmartValidatedEntityDefinition<T>>(cached);
}
