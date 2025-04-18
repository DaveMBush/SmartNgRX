import { EntityState } from '@ngrx/entity';

import { FacadeBase } from '../facades/facade.base';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { convertChildrenToVirtualArray } from './convert-children-to-virtual-array.function';
import { VirtualArray } from './virtual-array.class';
import { virtualArrayMap } from './virtual-array-map.const';

jest.mock('../registrations/facade-registry.class');
jest.mock('./virtual-array.class');
jest.mock('./virtual-array-map.const');

// Define a new type that extends SmartNgRXRowBase and includes the children field
interface ParentRow extends SmartNgRXRowBase {
  children: VirtualArrayContents;
}

describe('convertChildrenToVirtualArray', () => {
  let mockParentEntity: EntityState<ParentRow>;
  let mockActionService: FacadeBase;

  beforeEach(() => {
    mockActionService = {} as FacadeBase;
    (facadeRegistry.register as jest.Mock).mockReturnValue(mockActionService);

    mockParentEntity = {
      ids: ['1', '2'],
      entities: {
        '1': {
          id: '1',
          children: { indexes: ['child1', 'child2'], length: 2 },
        },
        '2': {
          id: '2',
          children: { indexes: ['child3', 'child4'], length: 2 },
        },
      },
    };

    // Reset all mocks before each test
    jest.clearAllMocks();

    (VirtualArray as jest.Mock).mockImplementation(() => ({
      fetchedIndexes: [],
      get: jest.fn(),
      set: jest.fn(),
    }));

    (virtualArrayMap.get as jest.Mock).mockReturnValue(undefined);
    (virtualArrayMap.set as jest.Mock).mockImplementation(() => {
      /* noop */
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should convert children to VirtualArray for each entity', () => {
    convertChildrenToVirtualArray<ParentRow, SmartNgRXRowBase>(
      'children',
      mockParentEntity,
      'parentFeature',
      'parentEntity',
    );

    expect(VirtualArray).toHaveBeenCalledTimes(2);
    // eslint-disable-next-line @typescript-eslint/unbound-method -- for testing
    expect(virtualArrayMap.set).toHaveBeenCalledTimes(2);
  });

  it('should not convert if children is already an array', () => {
    // Set up both entities to have regular arrays
    mockParentEntity.entities['1']!.children =
      [] as unknown as VirtualArrayContents;
    mockParentEntity.entities['2']!.children =
      [] as unknown as VirtualArrayContents;

    convertChildrenToVirtualArray<ParentRow, SmartNgRXRowBase>(
      'children',
      mockParentEntity,
      'parentFeature',
      'parentEntity',
    );

    expect(VirtualArray).not.toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method -- for testing
    expect(virtualArrayMap.set).not.toHaveBeenCalled();
    expect(mockParentEntity.entities['1']?.children).toEqual([]);
    expect(mockParentEntity.entities['2']?.children).toEqual([]);
  });

  it('should use existing VirtualArray fetchedIndexes if available', () => {
    const existingVirtualArray = {
      fetchedIndexes: [true, false],
      get: jest.fn(),
      set: jest.fn(),
    };
    (virtualArrayMap.get as jest.Mock).mockReturnValue(existingVirtualArray);

    // Mock VirtualArray to return a new object with the existing virtual array's properties
    (VirtualArray as jest.Mock).mockImplementation(() => {
      const virtualArray = {
        rawArray: [],
        fetchedIndexes: [] as boolean[],
        length: 0,
        array: { indexes: [], length: 0 },
        parentActionService: mockActionService,
      };
      // Set fetchedIndexes after creation to match the actual implementation
      virtualArray.fetchedIndexes = [...existingVirtualArray.fetchedIndexes];
      return virtualArray;
    });

    const result = convertChildrenToVirtualArray<ParentRow, SmartNgRXRowBase>(
      'children',
      mockParentEntity,
      'parentFeature',
      'parentEntity',
    );

    expect(VirtualArray).toHaveBeenCalledTimes(2);
    expect(
      (result.entities['1']?.children as unknown as VirtualArray<ParentRow>)
        .fetchedIndexes,
    ).toEqual([true, false]);
    expect(
      (result.entities['2']?.children as unknown as VirtualArray<ParentRow>)
        .fetchedIndexes,
    ).toEqual([true, false]);
  });
});
