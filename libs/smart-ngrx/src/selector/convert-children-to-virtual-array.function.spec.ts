import { EntityState } from '@ngrx/entity';

import { ActionGroup } from '../actions/action-group.interface';
import { ChildType } from '../types/child-type.type';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { convertChildrenToVirtualArray } from './convert-children-to-virtual-array.function';
import { VirtualArray } from './virtual-array.class';

describe('convertChildrenToVirtualArray', () => {
  interface Parent extends SmartNgRXRowBase {
    field: VirtualArray<Parent> | VirtualArrayContents;
  }

  let children: Partial<Record<keyof Parent, ChildType>>;
  let parentFieldName: keyof Parent;
  let parentEntity: EntityState<Parent>;
  let parentAction: ActionGroup;

  beforeEach(() => {
    children = { field: 'virtual' };
    parentFieldName = 'field';
    parentEntity = {
      ids: ['1'],
      entities: {
        '1': { id: '1', field: {} as VirtualArrayContents },
      },
    };
    parentAction = {} as ActionGroup;
  });

  it('should convert field to VirtualArray when children[parentFieldName] is "virtual"', () => {
    convertChildrenToVirtualArray(
      children,
      parentFieldName,
      parentEntity,
      parentAction,
    );

    const row = parentEntity.entities['1'];
    expect(row?.field).toBeInstanceOf(VirtualArray);
  });

  it('should not convert field to VirtualArray when children[parentFieldName] is not "virtual"', () => {
    children = { field: 'fixed' };

    convertChildrenToVirtualArray(
      children,
      parentFieldName,
      parentEntity,
      parentAction,
    );

    const row = parentEntity.entities['1'];
    expect(row?.field).not.toBeInstanceOf(VirtualArray);
  });
});
