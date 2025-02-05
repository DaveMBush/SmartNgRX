import { EntityState } from '@ngrx/entity';

import { entityRegistry } from '../registrations/entity-registry.class';
import { ChildDefinition } from '../types/child-definition.interface';
import { RowProxyDelete } from '../types/row-proxy-delete.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ensureDataLoaded } from './ensure-data-loaded.function';
import { realOrMocked } from './real-or-mocked.function';

/**
 * Internal function used by `createInnerSmartSelector` use to load the data if
 * it doesn't exist in the store and return a placeholder row if it doesn't
 * exist.
 *
 * @param entityState The `EntityState` to check for the id
 * @param id The id to check
 * @param childDefinition The `ChildDefinition` of the child object
 * that lets us retrieve the feature and entity names
 * @returns real or placeholder row
 */
export function getArrayItem<
  T extends SmartNgRXRowBase,
  P extends SmartNgRXRowBase,
>(
  entityState: EntityState<T>,
  id: string,
  childDefinition: ChildDefinition<P, T>,
): RowProxyDelete & T {
  const { childFeature, childEntity } = childDefinition;

  const registry = entityRegistry.get(childFeature, childEntity);
  ensureDataLoaded(entityState, id, childFeature, childEntity);
  return realOrMocked(
    entityState,
    id,
    registry.defaultRow(id) as T,
    childDefinition,
  );
}
