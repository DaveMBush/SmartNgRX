import { EntityState } from '@ngrx/entity';

import { getEntityRegistry } from '../functions/register-entity.function';
import { ProxyChild } from '../types/proxy-child.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ensureDataLoaded } from './ensure-data-loaded.function';
import { realOrMocked } from './real-or-mocked.function';

/**
 * Internal function used by `createInnerSmartSelector` use to load the data if
 * it doesn't exist in the store and return a placeholder row if it doesn't
 * exist.
 *
 * @param entityState The entity to check for the id
 * @param id The id to check
 * @param childDefinition The definition of the child object that lets us retrieve the feature and entity names
 * @returns real or placeholder row
 */
export function getArrayItem<
  T extends SmartNgRXRowBase,
  F extends string,
  E extends string,
>(
  entityState: EntityState<T>,
  id: string,
  childDefinition: ProxyChild<P, F, E>,
): T {
  const { childFeature, childEntity } = childDefinition;

  const registry = getEntityRegistry(childFeature, childEntity);
  ensureDataLoaded(entityState, id, childFeature, childEntity);
  return realOrMocked(
    entityState,
    id,
    registry.defaultRow(id),
    childDefinition,
  ) as T;
}
