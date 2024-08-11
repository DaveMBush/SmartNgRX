import { EntityState } from '@ngrx/entity';

import { ActionGroup } from '../actions/action-group.interface';
import { forNext } from '../common/for-next.function';
import { ChildType } from '../types/child-type.type';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { VirtualArray } from './virtual-array.class';

/**
 * Converts the child field to a virtual array
 *
 * @param children holds the type of child we are dealing with
 * @param parentFieldName the name of the field in the row to convert
 * @param parentEntity the entity data we are dealing with
 * @param parentAction the action group for the row
 */
export function convertChildrenToVirtualArray<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(
  children: Partial<Record<keyof P, ChildType>> | undefined,
  parentFieldName: keyof P,
  parentEntity: EntityState<P>,
  parentAction: ActionGroup,
): void {
  /* istanbul ignore next -- this is going away soon */
  if (children?.[parentFieldName] === 'virtual') {
    // Because NgRX freeze may be turned on
    forNext(parentEntity.ids as string[], (id) => {
      let row = parentEntity.entities[id]!;
      row = { ...row };
      const arrayContent = row[parentFieldName] as VirtualArrayContents;
      row[parentFieldName] = new VirtualArray<P, C>(
        arrayContent,
        parentAction,
        id,
        parentFieldName as string,
      ) as P[keyof P];
      parentEntity.entities[id] = row;
    });
  }
}
