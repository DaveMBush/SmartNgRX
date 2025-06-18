import { signal } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/smart-core';

import { getTopChildRows } from './get-top-child-rows.function';

describe('getTopChildRows', () => {
  interface TestParent {
    id: string;
    children: TestChild[];
  }

  interface TestChild extends SmartNgRXRowBase {
    id: string;
    name: string;
  }

  let mockEntityState: EntityState<TestParent>;

  beforeEach(() => {
    mockEntityState = {
      ids: [],
      entities: {},
    };
  });

  it('should return empty array when ids array is empty', () => {
    // Arrange
    const parentSignal = signal(mockEntityState);

    // Act
    const result = getTopChildRows<TestParent, TestChild>(
      parentSignal,
      'children',
    );

    // Assert
    expect(result()).toEqual([]);
  });

  it('should return empty array when ids array has multiple elements', () => {
    // Arrange
    mockEntityState = {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1', children: [{ id: 'c1', name: 'Child 1' }] },
        '2': { id: '2', children: [{ id: 'c2', name: 'Child 2' }] },
      },
    };
    const parentSignal = signal(mockEntityState);

    // Act
    const result = getTopChildRows<TestParent, TestChild>(
      parentSignal,
      'children',
    );

    // Assert
    expect(result()).toEqual([]);
  });

  it('should return empty array when top entity is undefined', () => {
    // Arrange
    mockEntityState = {
      ids: ['1'],
      entities: {},
    };
    const parentSignal = signal(mockEntityState);

    // Act
    const result = getTopChildRows<TestParent, TestChild>(
      parentSignal,
      'children',
    );

    // Assert
    expect(result()).toEqual([]);
  });

  it('should return empty array when children array is empty', () => {
    // Arrange
    mockEntityState = {
      ids: ['1'],
      entities: {
        '1': { id: '1', children: [] },
      },
    };
    const parentSignal = signal(mockEntityState);

    // Act
    const result = getTopChildRows<TestParent, TestChild>(
      parentSignal,
      'children',
    );

    // Assert
    expect(result()).toEqual([]);
  });

  it('should return children array when all conditions are met', () => {
    // Arrange
    const childrenArray = [
      { id: 'c1', name: 'Child 1' },
      { id: 'c2', name: 'Child 2' },
    ];
    mockEntityState = {
      ids: ['1'],
      entities: {
        '1': { id: '1', children: childrenArray },
      },
    };
    const parentSignal = signal(mockEntityState);

    // Act
    const result = getTopChildRows<TestParent, TestChild>(
      parentSignal,
      'children',
    );

    // Assert
    expect(result()).toEqual(childrenArray);
  });
});
