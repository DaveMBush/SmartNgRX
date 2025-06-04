import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SmartNgRXRowBase } from '@smarttools/smart-core';

import { ChildDefinitionClassic } from '../types/child-definition-classic.interface';
import { createInnerSmartSelector } from './create-inner-smart-selector.function';
import { createSmartSelector } from './create-smart-selector.function';
import { ParentSelector } from './parent-selector.type';

jest.mock('@ngrx/store', () => ({
  createFeatureSelector: jest.fn(),
  createSelector: jest.fn(),
}));

jest.mock('./create-inner-smart-selector.function', () => ({
  createInnerSmartSelector: jest.fn(),
}));

describe('createSmartSelector', () => {
  interface TestParent extends SmartNgRXRowBase {
    id: string;
    name: string;
    children: string[];
  }

  interface TestChild extends SmartNgRXRowBase {
    id: string;
    parentId: string;
    value: string;
  }

  const mockFeatureSelector = jest.fn();
  const mockSelector = jest.fn();
  const mockChildSelector = jest.fn();
  const mockInnerSelector = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- incorrect warning
    (createFeatureSelector as jest.Mock).mockReturnValue(mockFeatureSelector);
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- incorrect warning
    (createSelector as jest.Mock).mockReturnValue(mockSelector);
    (createInnerSmartSelector as jest.Mock).mockReturnValue(mockInnerSelector);
  });

  describe('with string parameters', () => {
    it('should create a feature selector with entity state', () => {
      const feature = 'testFeature';
      const entity = 'testEntity';
      const mockState = { [entity]: { ids: [], entities: {} } };

      createSmartSelector<TestParent>(feature, entity);

      // eslint-disable-next-line @typescript-eslint/no-deprecated -- incorrect warning
      expect(createFeatureSelector).toHaveBeenCalledWith(feature);
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- incorrect warning
      expect(createSelector).toHaveBeenCalledWith(
        mockFeatureSelector,
        expect.any(Function),
      );

      type MockCall = [unknown, (state: Record<string, unknown>) => unknown];
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- incorrect warning
      const mockCalls = (createSelector as jest.Mock).mock.calls as MockCall[];
      const selectorFn = mockCalls[0][1];
      const result = selectorFn(mockState);
      expect(result).toBe(mockState[entity]);
    });
  });

  describe('with selector and child definitions', () => {
    const mockParentSelector =
      jest.fn() as unknown as ParentSelector<TestParent>;
    const mockChildDefinition: ChildDefinitionClassic<TestParent, TestChild> = {
      childFeature: 'testChildFeature',
      childEntity: 'testChild',
      childSelector: mockChildSelector as unknown as ParentSelector<TestChild>,
      parentField: 'children',
      parentFeature: 'testParentFeature',
      parentEntity: 'testParent',
    };

    it('should reduce child definitions into a selector chain', () => {
      createSmartSelector<TestParent, TestChild>(mockParentSelector, [
        mockChildDefinition,
      ]);

      expect(createInnerSmartSelector).toHaveBeenCalledWith(
        mockParentSelector,
        mockChildDefinition,
      );
    });
  });

  describe('error cases', () => {
    it('should handle invalid parameter combinations', () => {
      const mockParentSelector =
        jest.fn() as unknown as ParentSelector<TestParent>;

      // Test invalid parameter combination
      expect(() => {
        // @ts-expect-error Testing invalid parameter combination
        createSmartSelector(mockParentSelector, 'invalid');
      }).toThrow();
    });
  });
});
