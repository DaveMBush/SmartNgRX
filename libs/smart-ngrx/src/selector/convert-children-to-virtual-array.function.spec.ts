import { EntityState } from '@ngrx/entity';

import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { convertChildrenToVirtualArray } from './convert-children-to-virtual-array.function';
import { VirtualArray } from './virtual-array.class';
import * as virtualArrayMapModule from './virtual-array-map.const';

describe('convertChildrenToVirtualArray', () => {
  interface Parent extends SmartNgRXRowBase {
    field: VirtualArray<Parent> | VirtualArrayContents;
  }

  let parentFieldName: keyof Parent;
  let parentEntity: EntityState<Parent>;
  let parentFeature: string;
  let parentEntityName: string;

  beforeEach(() => {
    parentFeature = 'parent';
    parentEntityName = 'parentEntity';
    parentFieldName = 'field';
    parentEntity = {
      ids: ['1'],
      entities: {
        '1': { id: '1', field: {} as VirtualArrayContents },
      },
    };
  });

  it('should convert field to VirtualArray when children[parentFieldName] is "virtual"', () => {
    convertChildrenToVirtualArray(
      parentFieldName,
      parentEntity,
      parentFeature,
      parentEntityName,
    );

    const row = parentEntity.entities['1'];
    expect(row?.field).toBeInstanceOf(VirtualArray);
  });

  it('should not convert field to VirtualArray when row[childField] is an Array', () => {
    const field = parentEntity.entities['1'];
    if (field) {
      field.field = [] as unknown as VirtualArrayContents;
    }
    convertChildrenToVirtualArray(
      parentFieldName,
      parentEntity,
      parentFeature,
      parentEntityName,
    );

    const row = parentEntity.entities['1'];
    expect(row?.field).not.toBeInstanceOf(VirtualArray);
  });
  it('should use existing fetchedIndexes when available', () => {
    const existingFetchedIndexes = [true, false, true];
    const mockVirtualArray = {
      fetchedIndexes: existingFetchedIndexes,
    };

    jest
      .spyOn(virtualArrayMapModule.virtualArrayMap, 'get')
      .mockReturnValue(mockVirtualArray as VirtualArray<SmartNgRXRowBase>);

    convertChildrenToVirtualArray(
      parentFieldName,
      parentEntity,
      parentFeature,
      parentEntityName,
    );

    const row = parentEntity.entities['1'];
    expect((row?.field as VirtualArray<Parent>).fetchedIndexes).toEqual(
      existingFetchedIndexes,
    );
  });
});
