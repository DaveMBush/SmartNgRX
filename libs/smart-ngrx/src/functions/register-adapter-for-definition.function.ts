import { createEntityAdapter } from '@ngrx/entity';

import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { adapterForEntity } from './adapter-for-entity.function';

/**
 * This registers the adapter for the entity definition.
 *
 * @param featureName the feature the entity belongs to
 * @param entityDefinition the entity definition to register the adapter for
 *
 * @see `EntityDefinition`
 */
export function registerAdapterForDefinition(
  featureName: string,
  entityDefinition: SmartEntityDefinition<SmartNgRXRowBase>,
): void {
  if (entityDefinition.entityAdapter !== undefined) {
    adapterForEntity(
      featureName,
      entityDefinition.entityName,
      entityDefinition.entityAdapter,
    );
  } else {
    adapterForEntity(
      featureName,
      entityDefinition.entityName,
      createEntityAdapter(),
    );
  }
}
