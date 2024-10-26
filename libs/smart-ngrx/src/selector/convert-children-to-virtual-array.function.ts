import { EntityState } from '@ngrx/entity';

import { assert } from '../common/assert.function';
import { actionServiceRegistry } from '../registrations/action.service.registry';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { VirtualArray } from './virtual-array.class';
import { virtualArrayMap } from './virtual-array-map.const';

/**
 * Converts the child field to a virtual array
 *
 * @param parentFieldName the name of the field in the row to convert
 * @param parentEntity the entity data we are dealing with
 * @param parentFeature the feature this entity belongs to
 * @param parentEntityName the name of the entity
 */
export function convertChildrenToVirtualArray<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  parentFieldName: keyof P,
  parentEntity: EntityState<P>,
  parentFeature: string,
  parentEntityName: string,
): void {
  const parentActionService = actionServiceRegistry(
    parentFeature,
    parentEntityName,
  );
  assert(!!parentActionService, 'parentActionService is undefined');

  const length = parentEntity.ids.length;
  for (let i = 0; i < length; i++) {
    const id = parentEntity.ids[i] as string;
    let row = parentEntity.entities[id]!;
    row = { ...row };
    const arrayContent = row[parentFieldName] as VirtualArrayContents;
    // if it is an array, we can't convert it to a virtual array.
    if (Array.isArray(arrayContent)) {
      return;
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
    parentEntity.entities[id] = row;
  }
}
