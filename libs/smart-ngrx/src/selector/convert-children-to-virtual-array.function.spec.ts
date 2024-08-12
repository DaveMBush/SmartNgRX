import { EntityState } from '@ngrx/entity';

import { ActionGroup } from '../actions/action-group.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { convertChildrenToVirtualArray } from './convert-children-to-virtual-array.function';
import { VirtualArray } from './virtual-array.class';

describe('convertChildrenToVirtualArray', () => {
  interface Parent extends SmartNgRXRowBase {
    field: VirtualArray<Parent> | VirtualArrayContents;
  }

  let parentFieldName: keyof Parent;
  let parentEntity: EntityState<Parent>;
  let parentAction: ActionGroup;

  beforeEach(() => {
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
    convertChildrenToVirtualArray(parentFieldName, parentEntity, parentAction);

    const row = parentEntity.entities['1'];
    expect(row?.field).toBeInstanceOf(VirtualArray);
  });

  it('should not convert field to VirtualArray when row[childField] is an Array', () => {
    const field = parentEntity.entities['1'];
    if (field) {
      field.field = [] as unknown as VirtualArrayContents;
    }
    convertChildrenToVirtualArray(parentFieldName, parentEntity, parentAction);

    const row = parentEntity.entities['1'];
    expect(row?.field).not.toBeInstanceOf(VirtualArray);
  });
});
