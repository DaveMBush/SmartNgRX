import { EntityState } from '@ngrx/entity';

import { ActionGroup } from '../actions/action-group.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { VirtualArray } from './virtual-array.class';

/**
 * Converts the child field to a virtual array
 *
 * @param parentFieldName the name of the field in the row to convert
 * @param parentEntity the entity data we are dealing with
 * @param parentAction the action group for the row
 */
export function convertChildrenToVirtualArray<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  parentFieldName: keyof P,
  parentEntity: EntityState<P>,
  parentAction: ActionGroup,
): void {
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
    row[parentFieldName] = new VirtualArray<P, C>(
      arrayContent,
      parentAction,
      id,
      parentFieldName as string,
    ) as P[keyof P];
    parentEntity.entities[id] = row;
  }
}
