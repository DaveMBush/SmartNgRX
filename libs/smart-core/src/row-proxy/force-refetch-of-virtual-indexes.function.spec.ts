import * as forNextModule from '../common/for-next.function';
import { BaseArrayProxy } from '../smart-selector/base-array-proxy.class';
import { VirtualArray } from '../smart-selector/virtual-array.class';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { forceRefetchOfVirtualIndexes } from './force-refetch-of-virtual-indexes.function';

describe('forceRefetchOfVirtualIndexes', () => {
  let forNextSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    forNextSpy = jest
      .spyOn(forNextModule, 'forNext')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    forNextSpy.mockRestore();
  });

  it('should return early if row is not dirty', () => {
    // Arrange
    const mockRow: SmartNgRXRowBase = {
      id: '1',
      isDirty: false,
    };

    // Act
    forceRefetchOfVirtualIndexes(mockRow);

    // Assert
    expect(forNextSpy).not.toHaveBeenCalled();
  });

  it('should process keys when row is dirty', () => {
    // Arrange
    const mockRow: SmartNgRXRowBase = {
      id: '1',
      isDirty: true,
    };

    // Act
    forceRefetchOfVirtualIndexes(mockRow);

    // Assert
    expect(forNextSpy).toHaveBeenCalled();
    // Check keys individually to avoid type issues
    const mockCalls = forNextSpy.mock.calls as Array<
      [string[], (key: string) => void]
    >;
    const keysArray = mockCalls[0]?.[0] ?? [];
    expect(keysArray.includes('id')).toBe(true);
    expect(keysArray.includes('isDirty')).toBe(true);
  });

  it('should skip processing when property is undefined', () => {
    // Arrange
    const mockRow = {
      id: '1',
      isDirty: true,
      undefinedProp: undefined,
    } as unknown as SmartNgRXRowBase;

    let innerFunctionCalled = false;
    forNextSpy.mockImplementation(
      (array: unknown[], callback: (key: string) => void) => {
        // Test the inner function directly
        callback('undefinedProp');
        innerFunctionCalled = true;
      },
    );

    // Act
    forceRefetchOfVirtualIndexes(mockRow);

    // Assert
    expect(forNextSpy).toHaveBeenCalled();
    expect(innerFunctionCalled).toBe(true);
  });

  it('should skip processing when property is not a valid array proxy', () => {
    // Arrange
    const mockRow = {
      id: '1',
      isDirty: true,
      notArrayProxy: 'string value',
    } as unknown as SmartNgRXRowBase;

    let innerFunctionCalled = false;
    forNextSpy.mockImplementation(
      (array: unknown[], callback: (key: string) => void) => {
        callback('notArrayProxy');
        innerFunctionCalled = true;
      },
    );

    // Act
    forceRefetchOfVirtualIndexes(mockRow);

    // Assert
    expect(forNextSpy).toHaveBeenCalled();
    expect(innerFunctionCalled).toBe(true);
  });

  it('should skip processing when rawArray is not a VirtualArray', () => {
    // Arrange
    const mockArrayProxy = {
      rawArray: {},
    } as unknown as BaseArrayProxy;

    const mockRow = {
      id: '1',
      isDirty: true,
      arrayProp: mockArrayProxy,
    } as unknown as SmartNgRXRowBase;

    let innerFunctionCalled = false;
    forNextSpy.mockImplementation(
      (array: unknown[], callback: (key: string) => void) => {
        callback('arrayProp');
        innerFunctionCalled = true;
      },
    );

    // Act
    forceRefetchOfVirtualIndexes(mockRow);

    // Assert
    expect(forNextSpy).toHaveBeenCalled();
    expect(innerFunctionCalled).toBe(true);
  });

  it('should call refetchIndexes when property has a valid VirtualArray', () => {
    // Arrange
    const mockRefetchIndexes = jest.fn();

    const mockVirtualArray = {
      refetchIndexes: mockRefetchIndexes,
    } as unknown as VirtualArray<SmartNgRXRowBase>;

    // Make instanceof check return true
    Object.setPrototypeOf(mockVirtualArray, VirtualArray.prototype);

    const mockArrayProxy = {
      rawArray: mockVirtualArray,
    } as unknown as BaseArrayProxy;

    const mockRow = {
      id: '1',
      isDirty: true,
      arrayProp: mockArrayProxy,
    } as unknown as SmartNgRXRowBase;

    forNextSpy.mockImplementation(
      (array: unknown[], callback: (key: string) => void) => {
        callback('arrayProp');
      },
    );

    // Act
    forceRefetchOfVirtualIndexes(mockRow);

    // Assert
    expect(forNextSpy).toHaveBeenCalled();
    expect(mockRefetchIndexes).toHaveBeenCalledTimes(1);
  });
});
