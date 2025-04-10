import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase, VirtualArrayContents } from '@smarttools/core';

import { facadeRegistry } from '../registrations/facade-registry.class';
import { VirtualArray } from '../../../smart-ngrx/src/smart-selector/virtual-array.class';
import { virtualArrayMap } from './virtual-array-map.const';

/**
 * Converts the child field to a virtual array
 *
 * @param parentFieldName the name of the field in the row to convert
 * @param parentEntity the entity data we are dealing with
 * @param parentFeature the feature this entity belongs to
 * @param parentEntityName the name of the entity
 *
 * @returns the entity with the child field converted to a virtual array
 */
export function convertChildrenToVirtualArray<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  parentFieldName: keyof P,
  parentEntity: EntityState<P>,
  parentFeature: string,
  parentEntityName: string,
): EntityState<P> {
  const returnEntity = {
    ids: [...parentEntity.ids],
    entities: { ...parentEntity.entities },
  } as EntityState<P>;

  const parentActionService = facadeRegistry.register(
    parentFeature,
    parentEntityName,
  );

  const length = parentEntity.ids.length;
  for (let i = 0; i < length; i++) {
    const id = parentEntity.ids[i] as string;
    const row = { ...parentEntity.entities[id]! };
    const arrayContent = row[parentFieldName] as VirtualArrayContents;
    // if it is an array, we can't convert it to a virtual array.
    if (Array.isArray(arrayContent)) {
      continue;
    }
    const existingVirtualArray = virtualArrayMap.get(
      parentFeature,
      parentEntityName,
      id,
      parentFieldName as string,
    );
    const virtualArray = new VirtualArray<P, C>(
      arrayContent,
      parentActionService,
      id,
      parentFieldName as string,
    );
    virtualArray.fetchedIndexes = existingVirtualArray?.fetchedIndexes || [];
    row[parentFieldName] = virtualArray as P[keyof P];
    virtualArrayMap.set(
      parentFeature,
      parentEntityName,
      id,
      parentFieldName as string,
      row[parentFieldName] as VirtualArray<SmartNgRXRowBase>,
    );
    returnEntity.entities[id] = row;
  }
  return returnEntity;
}
