import { EntityState } from '@ngrx/entity';

import { convertEntityIdToName } from './convert-entity-id-to-name.function';
import { Entity } from './entity.interface';

interface EntityStateFactoryParameters {
  parentCount: number;
  childCount: number;
  parentType: string;
  childType: string;
  isDirty?: boolean;
}

interface MapIdToEntityParameters {
  childCount: number;
  childType: string;
  isDirty: boolean;
}

interface MapEmptyArrayToChildrenParameters {
  childType: string;
  parentIndex: number;
  childCount: number;
}

const mapEmptyArrayToChildren =
  ({ childType, parentIndex, childCount }: MapEmptyArrayToChildrenParameters) =>
  (_: number, childIndex: number): string =>
    `${childType}-${parentIndex * childCount + childIndex + 1}`;

const mapIdToEntity =
  ({ childCount, childType, isDirty }: MapIdToEntityParameters) =>
  (id: string, parentIndex: number): Entity => ({
    id,
    name: convertEntityIdToName(id),
    children: Array(childCount)
      .fill(0)
      .map(mapEmptyArrayToChildren({ childCount, parentIndex, childType })),
    isDirty,
  });

const reduceEntityArrayToObject = (
  obj: EntityState<Entity>['entities'],
  entity: Entity,
): EntityState<Entity>['entities'] => ({
  ...obj,
  [entity.id]: entity,
});

/**
 * Used by unit tests to create a mock entity state.
 *
 * @param params The parameters to use to create the mock entity state.
 *
 * @returns
 */
export function entityStateFactory(
  params: EntityStateFactoryParameters,
): EntityState<Entity> {
  const {
    parentCount,
    childCount,
    parentType,
    childType,
    isDirty = false,
  } = params;
  const ids = Array(parentCount)
    .fill(0)
    .map((_, i) => `${parentType}-${i + 1}`);

  const entities = ids
    .map(mapIdToEntity({ childCount, childType, isDirty }))
    .reduce(reduceEntityArrayToObject, {});

  return {
    ids,
    entities,
  };
}
