import { EntityState } from '@ngrx/entity';

import { getEntityRegistry } from '../functions/register-entity.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ensureDataLoaded } from './ensure-data-loaded.function';
import { realOrMocked } from './real-or-mocked.function';

/**
 * Internal function used by `createInnerSmartSelector` use to load the data if
 * it doesn't exist in the store and return a placeholder row if it doesn't
 * exist.
 *
 * @param entityState The entity to check for the id
 * @param id The id to check
 * @param feature the feature name we are running this code for
 * @param entity the entity in the feature we are running this code for
 * @returns real or placeholder row
 */
export function getArrayItem<
  T extends MarkAndDelete,
  F extends string,
  E extends string,
>(
  entityState: EntityState<T>,
  id: string,
  feature: StringLiteralSource<F>,
  entity: StringLiteralSource<E>,
): T {
  const registry = getEntityRegistry(feature, entity);
  ensureDataLoaded(entityState, id, feature, entity);
  return realOrMocked(entityState, id, registry.defaultRow(id)) as T;
}
