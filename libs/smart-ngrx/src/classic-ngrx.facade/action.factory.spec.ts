import { SmartNgRXRowBase } from '@smarttools/smart-core';

import { actionFactory } from './action.factory';

describe('ActionFactory', () => {
  interface TestRow extends SmartNgRXRowBase {
    name: string;
  }

  afterEach(() => {
    // Reset module between tests to clear cache
    jest.resetModules();
  });

  it('should create action groups', () => {
    const actionGroup = actionFactory<TestRow>('test', 'row');

    expect(actionGroup).toBeDefined();
    expect(actionGroup.storeRows).toBeDefined();
    expect(actionGroup.updateMany).toBeDefined();
    expect(actionGroup.remove).toBeDefined();
    expect(actionGroup.upsertRow).toBeDefined();
  });

  it('should return cached action group when called with same parameters', () => {
    const feature = 'test';
    const entity = 'entity';

    // First call should create a new action group
    const firstActionGroup = actionFactory<TestRow>(feature, entity);

    // Second call with same parameters should return the cached version
    const secondActionGroup = actionFactory<TestRow>(feature, entity);

    // Verify they are the same instance
    expect(secondActionGroup).toBe(firstActionGroup);
  });

  it('should create different action groups for different parameters', () => {
    const actionGroup1 = actionFactory<TestRow>('feature1', 'entity');
    const actionGroup2 = actionFactory<TestRow>('feature2', 'entity');

    expect(actionGroup1).not.toBe(actionGroup2);
  });
});
