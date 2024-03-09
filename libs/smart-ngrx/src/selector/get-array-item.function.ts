import { EntityState } from '@ngrx/entity';

import { actionFactory } from '../functions/action.factory';
import { getEntityRegistry } from '../functions/register-entity.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
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
 * @param feature the feature name we are running this code for
 * @param entity the entity in the feature we are running this code for
 * @returns real or placeholder row
 */
export function getArrayItem<
  T extends SmartNgRXRowBase,
  F extends string,
  E extends string,
  PF extends string,
  PE extends string
>(
  entityState: EntityState<T>,
  id: string,
  feature: StringLiteralSource<F>,
  entity: StringLiteralSource<E>,
  parentFeature: StringLiteralSource<PF>,
  parentEntity: StringLiteralSource<PE>,
): T {
  const registry = getEntityRegistry(feature, entity);
  ensureDataLoaded(entityState, id, feature, entity);
  const actions = actionFactory(feature, entity);
  const parentActions = actionFactory(parentFeature, parentEntity);
  return realOrMocked(entityState, id, registry.defaultRow(id), actions, parentActions) as T;
}
