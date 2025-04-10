import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase, VirtualArrayContents } from '@smarttools/core';

import { FacadeBase } from '../../../smart-core/src/facades/facade.base';
import { ArrayProxy } from '../smart-selector/array-proxy.class';
import { VirtualArray } from '../smart-selector/virtual-array.class';
import { ChildDefinition } from '../../../smart-core/src/types/child-definition.interface';
import { forceRefetchOfVirtualIndexes } from './force-refetch-of-virtual-indexes.function';

// Define a custom row type that includes the necessary fields
interface TestRow extends SmartNgRXRowBase {
  someField?: ArrayProxy | string[];
}

// Mock implementations
class MockVirtualArray<T extends SmartNgRXRowBase> extends VirtualArray<T> {
  constructor() {
    const virtualArrayContents: VirtualArrayContents = {
      indexes: [],
      length: 0,
    };
    super(virtualArrayContents, {} as FacadeBase, '', '');
  }

  override refetchIndexes = jest.fn();
}

class MockArrayProxy<T extends SmartNgRXRowBase> extends ArrayProxy<T, T> {
  override rawArray: MockVirtualArray<T> & string[];

  constructor(rawArray: MockVirtualArray<T>) {
    super([] as string[], {} as EntityState<T>, {} as ChildDefinition<T, T>);
    this.rawArray = rawArray as MockVirtualArray<T> & string[];
  }
}

describe('forceRefetchOfVirtualIndexes', () => {
  let mockVirtualArray: MockVirtualArray<SmartNgRXRowBase>;

  beforeEach(() => {
    mockVirtualArray = new MockVirtualArray<SmartNgRXRowBase>();
  });

  it('should refetch indexes if the row is dirty and contains a VirtualArray', () => {
    const mockArrayProxy = new MockArrayProxy<SmartNgRXRowBase>(
      mockVirtualArray,
    );

    const row: TestRow = {
      id: '1',
      isDirty: true,
      someField: mockArrayProxy,
    };

    forceRefetchOfVirtualIndexes(row);

    expect(mockVirtualArray.refetchIndexes).toHaveBeenCalled();
  });

  it('should not refetch indexes if the row is not dirty', () => {
    const mockArrayProxy = new MockArrayProxy<SmartNgRXRowBase>(
      mockVirtualArray,
    );

    const row: TestRow = {
      id: '1',
      isDirty: false,
      someField: mockArrayProxy,
    };

    forceRefetchOfVirtualIndexes(row);

    expect(mockVirtualArray.refetchIndexes).not.toHaveBeenCalled();
  });

  it('should not refetch indexes if the field is not a VirtualArray', () => {
    const row: TestRow = {
      id: '1',
      isDirty: true,
      someField: [],
    };

    forceRefetchOfVirtualIndexes(row);

    expect(mockVirtualArray.refetchIndexes).not.toHaveBeenCalled();
  });

  it('should not refetch indexes if the arrayProxy is undefined', () => {
    const row: TestRow = {
      id: '1',
      isDirty: true,
      someField: undefined,
    };

    forceRefetchOfVirtualIndexes(row);

    expect(mockVirtualArray.refetchIndexes).not.toHaveBeenCalled();
  });
});
