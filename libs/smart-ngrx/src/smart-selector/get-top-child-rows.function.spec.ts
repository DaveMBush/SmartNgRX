import { EntityState } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { SmartNgRXRowBase } from '@smarttools/smart-core';

import { getTopChildRows } from './get-top-child-rows.function';

interface TestParent extends SmartNgRXRowBase {
  children: TestChild[];
}

interface TestChild extends SmartNgRXRowBase {
  name: string;
}

describe('getTopChildRows', () => {
  it('should return children when there is exactly one parent', () => {
    const mockChildren: TestChild[] = [
      { id: '1', name: 'Child 1' },
      { id: '2', name: 'Child 2' },
    ];

    const mockParent: TestParent = {
      id: '1',
      children: mockChildren,
    };

    const mockState: EntityState<TestParent> = {
      ids: ['1'],
      entities: { '1': mockParent },
    };

    const selectParent = createSelector(
      () => mockState,
      (state) => state,
    );

    const selectChild = getTopChildRows<TestParent, TestChild>(
      selectParent,
      'children',
    );

    const result = selectChild({});

    expect(result).toEqual(mockChildren);
  });

  it('should return empty array when there are multiple parents', () => {
    const mockParent1: TestParent = {
      id: '1',
      children: [{ id: '1', name: 'Child 1' }],
    };

    const mockParent2: TestParent = {
      id: '2',
      children: [{ id: '2', name: 'Child 2' }],
    };

    const mockState: EntityState<TestParent> = {
      ids: ['1', '2'],
      entities: {
        '1': mockParent1,
        '2': mockParent2,
      },
    };

    const selectParent = createSelector(
      () => mockState,
      (state) => state,
    );

    const selectChild = getTopChildRows<TestParent, TestChild>(
      selectParent,
      'children',
    );

    const result = selectChild({});

    expect(result).toEqual([]);
  });

  it('should return empty array when there are no parents', () => {
    const mockState: EntityState<TestParent> = {
      ids: [],
      entities: {},
    };

    const selectParent = createSelector(
      () => mockState,
      (state) => state,
    );

    const selectChild = getTopChildRows<TestParent, TestChild>(
      selectParent,
      'children',
    );

    const result = selectChild({});

    expect(result).toEqual([]);
  });
});
