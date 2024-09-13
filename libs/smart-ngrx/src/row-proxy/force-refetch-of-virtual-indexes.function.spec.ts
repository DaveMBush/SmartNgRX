import { ActionGroup } from '../actions/action-group.interface';
import { ArrayProxy } from '../selector/array-proxy.class';
import { VirtualArray } from '../selector/virtual-array.class';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { forceRefetchOfVirtualIndexes } from './force-refetch-of-virtual-indexes.function';

interface TestRow extends SmartNgRXRowBase {
  field: ArrayProxy | string;
  field2?: ArrayProxy | string;
  undefinedField?: undefined;
}

describe('forceRefetchOfVirtualIndexes', () => {
  let row: TestRow;

  beforeEach(() => {
    row = {
      id: '1',
      isDirty: true,
      field: {
        rawArray: new VirtualArray<SmartNgRXRowBase>(
          { length: 0, indexes: [] },
          {} as ActionGroup,
          'parentId',
          'childField',
        ),
      } as unknown as ArrayProxy,
    };
  });

  it('should not refetch indexes if row is not dirty', () => {
    row.isDirty = false;
    const mockRefetchIndexes = jest.fn();
    (row.field as ArrayProxy).rawArray = [] as string[];
    (
      (row.field as ArrayProxy)
        .rawArray as unknown as VirtualArray<SmartNgRXRowBase>
    ).refetchIndexes = mockRefetchIndexes;

    forceRefetchOfVirtualIndexes(row);

    expect(mockRefetchIndexes).not.toHaveBeenCalled();
  });

  it('should refetch indexes for VirtualArray fields when row is dirty', () => {
    const mockRefetchIndexes = jest
      .spyOn(
        (row.field as ArrayProxy)
          .rawArray as unknown as VirtualArray<SmartNgRXRowBase>,
        'refetchIndexes',
      )
      .mockImplementation(() => {
        /** noop */
      });

    forceRefetchOfVirtualIndexes(row);

    expect(mockRefetchIndexes).toHaveBeenCalled();
  });

  it('should not refetch indexes for non-VirtualArray fields', () => {
    row.field = 'not a VirtualArray';

    // This should not throw an error
    expect(() => forceRefetchOfVirtualIndexes(row)).not.toThrow();
  });

  it('should handle multiple VirtualArray fields', () => {
    const mockRefetchIndexes = jest
      .spyOn(
        (row.field as ArrayProxy)
          .rawArray as unknown as VirtualArray<SmartNgRXRowBase>,
        'refetchIndexes',
      )
      .mockImplementation(() => {
        /** noop */
      });
    row.field2 = {
      rawArray: new VirtualArray<SmartNgRXRowBase>(
        { length: 0, indexes: [] },
        {} as ActionGroup,
        'parentId',
        'childField',
      ),
    } as unknown as ArrayProxy;
    const mockRefetchIndexes2 = jest
      .spyOn(
        (row.field as ArrayProxy)
          .rawArray as unknown as VirtualArray<SmartNgRXRowBase>,
        'refetchIndexes',
      )
      .mockImplementation(() => {
        /** noop */
      });

    forceRefetchOfVirtualIndexes(row);

    expect(mockRefetchIndexes).toHaveBeenCalled();
    expect(mockRefetchIndexes2).toHaveBeenCalled();
  });

  it('should handle VirtualArray fields with string[] rawArray', () => {
    (row.field as ArrayProxy).rawArray = ['1', '2', '3'];

    // This should not throw an error
    expect(() => forceRefetchOfVirtualIndexes(row)).not.toThrow();
  });

  it('should handle rows with no VirtualArray fields', () => {
    row.field = 'not a VirtualArray';
    // This should not throw an error
    expect(() => forceRefetchOfVirtualIndexes(row)).not.toThrow();
  });

  it('should handle undefined fields', () => {
    row.undefinedField = undefined;

    // This should not throw an error
    expect(() => forceRefetchOfVirtualIndexes(row)).not.toThrow();
  });
});
