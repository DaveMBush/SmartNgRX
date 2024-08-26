import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import * as isVirtualArrayModule from './is-virtual-array.function';
import { mergeNewRowWithExisting } from './merge-new-row-with-existing.function';
import * as mergeVirtualArraysModule from './merge-virtual-arrays.function';

describe('mergeNewRowWithExisting', () => {
  const feature = 'testFeature';
  const entity = 'testEntity';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(isVirtualArrayModule, 'isVirtualArray');
    jest.spyOn(mergeVirtualArraysModule, 'mergeVirtualArrays');
  });

  it('should return newRow when no virtual arrays are present', () => {
    const newRow = { id: '1', name: 'Test' };
    const existingRow = { id: '1', name: 'Old Test' };

    const result = mergeNewRowWithExisting(
      feature,
      entity,
      newRow,
      existingRow,
    );

    expect(result).toEqual(newRow);
    expect(isVirtualArrayModule.isVirtualArray).toHaveBeenCalledTimes(2);
    expect(mergeVirtualArraysModule.mergeVirtualArrays).not.toHaveBeenCalled();
  });

  it('should handle mixed virtual and non-virtual properties', () => {
    const virtualArray: VirtualArrayContents = {
      indexes: ['1', '2', '3'],
      length: 3,
    };
    const newRow = { id: '1', name: 'Test', data: virtualArray };
    const existingRow = {
      id: '1',
      name: 'Old Test',
      data: { indexes: ['4', '5', '6'], length: 3 },
    };

    jest
      .spyOn(isVirtualArrayModule, 'isVirtualArray')
      .mockImplementation((value) => value === virtualArray);
    jest
      .spyOn(mergeVirtualArraysModule, 'mergeVirtualArrays')
      .mockReturnValue({ indexes: ['1', '2', '3', '4', '5', '6'], length: 6 });

    const result = mergeNewRowWithExisting(
      feature,
      entity,
      newRow,
      existingRow,
    );

    expect(result).toEqual({
      id: '1',
      name: 'Test',
      data: { indexes: ['1', '2', '3', '4', '5', '6'], length: 6 },
    });
    expect(isVirtualArrayModule.isVirtualArray).toHaveBeenCalledTimes(3);
    expect(mergeVirtualArraysModule.mergeVirtualArrays).toHaveBeenCalledTimes(
      1,
    );
  });
});
