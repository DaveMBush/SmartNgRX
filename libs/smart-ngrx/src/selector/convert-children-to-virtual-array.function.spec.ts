import { EntityState } from '@ngrx/entity';

import { ActionService } from '../actions/action.service';
import { actionServiceRegistry } from '../registrations/action.service.registry';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../types/virtual-array-contents.interface';
import { convertChildrenToVirtualArray } from './convert-children-to-virtual-array.function';
import { VirtualArray } from './virtual-array.class';
import { virtualArrayMap } from './virtual-array-map.const';

jest.mock('../registrations/action.service.registry');
jest.mock('./virtual-array.class');
jest.mock('./virtual-array-map.const');

// Define a new type that extends SmartNgRXRowBase and includes the children field
interface ParentRow extends SmartNgRXRowBase {
  children: VirtualArrayContents;
}

describe('convertChildrenToVirtualArray', () => {
  let mockParentEntity: EntityState<ParentRow>;
  let mockActionService: ActionService;

  beforeEach(() => {
    mockActionService = {} as ActionService;
    (actionServiceRegistry as jest.Mock).mockReturnValue(mockActionService);

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

    (VirtualArray as jest.Mock).mockImplementation(() => ({
      fetchedIndexes: [],
      // Add other properties that VirtualArray should have
      get: jest.fn(),
      set: jest.fn(),
      // ... add other methods as needed
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
    mockParentEntity.entities['1']!.children =
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
  });

  it('should use existing VirtualArray fetchedIndexes if available', () => {
    const existingVirtualArray = {
      fetchedIndexes: [true, false],
      // Add other properties that VirtualArray should have
      get: jest.fn(),
      set: jest.fn(),
      // ... add other methods as needed
    };
    (virtualArrayMap.get as jest.Mock).mockReturnValue(existingVirtualArray);

    convertChildrenToVirtualArray<ParentRow, SmartNgRXRowBase>(
      'children',
      mockParentEntity,
      'parentFeature',
      'parentEntity',
    );

    expect(VirtualArray).toHaveBeenCalledTimes(2);
    expect(
      (
        mockParentEntity.entities['1']
          ?.children as unknown as VirtualArray<ParentRow>
      ).fetchedIndexes,
    ).toEqual([true, false]);
    expect(
      (
        mockParentEntity.entities['2']
          ?.children as unknown as VirtualArray<ParentRow>
      ).fetchedIndexes,
    ).toEqual([true, false]);
  });

  it('should throw an error if actionServiceRegistry returns undefined', () => {
    (actionServiceRegistry as jest.Mock).mockReturnValue(undefined);

    expect(() => {
      convertChildrenToVirtualArray<ParentRow, SmartNgRXRowBase>(
        'children',
        mockParentEntity,
        'parentFeature',
        'parentEntity',
      );
    }).toThrow('Error: parentActionService is undefined');
  });
});
