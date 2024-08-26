import { newRowRegistry } from '../selector/new-row-registry.class';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import * as forNextModule from './for-next.function';
import { mergeVirtualArrays } from './merge-virtual-arrays.function';

describe('mergeVirtualArrays', () => {
  const feature = 'testFeature';
  const entity = 'testEntity';

  let forNextSpy: jest.SpyInstance;
  let isNewRowSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    forNextSpy = jest.spyOn(forNextModule, 'forNext');
    isNewRowSpy = jest.spyOn(newRowRegistry, 'isNewRow');
  });

  it('should merge arrays when existing array is empty', () => {
    const newArray: VirtualArrayContents = {
      indexes: ['1', '2', '3'],
      length: 3,
    };
    const existingArray: VirtualArrayContents = {
      indexes: [],
      length: 0,
    };

    const result = mergeVirtualArrays(feature, entity, newArray, existingArray);

    expect(result).toEqual({
      indexes: ['1', '2', '3'],
      length: 3,
    });
    expect(forNextSpy).toHaveBeenCalledWith(
      newArray.indexes,
      expect.any(Function),
    );
  });

  it('should merge arrays when new array is empty', () => {
    const newArray: VirtualArrayContents = {
      indexes: [],
      length: 0,
    };
    const existingArray: VirtualArrayContents = {
      indexes: ['1', '2', '3'],
      length: 3,
    };

    const result = mergeVirtualArrays(feature, entity, newArray, existingArray);

    expect(result).toEqual({
      indexes: ['1', '2', '3'],
      length: 0,
    });
    expect(forNextSpy).toHaveBeenCalledWith(
      newArray.indexes,
      expect.any(Function),
    );
  });

  it('should merge arrays and keep new row at the end', () => {
    isNewRowSpy.mockReturnValue(true);

    const newArray: VirtualArrayContents = {
      indexes: ['4', '5'],
      length: 2,
    };
    const existingArray: VirtualArrayContents = {
      indexes: ['1', '2', 'newRow'],
      length: 3,
    };

    const result = mergeVirtualArrays(feature, entity, newArray, existingArray);

    expect(result).toEqual({
      indexes: ['4', '5', 'newRow'],
      length: 3,
    });
    expect(isNewRowSpy).toHaveBeenCalledWith(feature, entity, 'newRow');
    expect(forNextSpy).toHaveBeenCalledWith(
      newArray.indexes,
      expect.any(Function),
    );
  });

  it('should merge arrays without new row', () => {
    isNewRowSpy.mockReturnValue(false);

    const newArray: VirtualArrayContents = {
      indexes: ['4', '5'],
      length: 2,
    };
    const existingArray: VirtualArrayContents = {
      indexes: ['1', '2', '3'],
      length: 3,
    };

    const result = mergeVirtualArrays(feature, entity, newArray, existingArray);

    expect(result).toEqual({
      indexes: ['4', '5', '3'],
      length: 2,
    });
    expect(isNewRowSpy).toHaveBeenCalledWith(feature, entity, '3');
    expect(forNextSpy).toHaveBeenCalledWith(
      newArray.indexes,
      expect.any(Function),
    );
  });

  it('should handle new array longer than existing array', () => {
    const newArray: VirtualArrayContents = {
      indexes: ['4', '5', '6', '7'],
      length: 4,
    };
    const existingArray: VirtualArrayContents = {
      indexes: ['1', '2'],
      length: 2,
    };

    const result = mergeVirtualArrays(feature, entity, newArray, existingArray);

    expect(result).toEqual({
      indexes: ['4', '5', '6', '7'],
      length: 4,
    });
    expect(forNextSpy).toHaveBeenCalledWith(
      newArray.indexes,
      expect.any(Function),
    );
  });
});
