import {
  BaseChildDefinition,
  facadeRegistry,
  ParentInfo,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';

import { removeIdFromParentsSignals } from './remove-id-from-parents-signals.function';
import { SignalsFacade } from './signals-facade';

jest.mock('../../../smart-core/src/registrations/facade-registry.class');
jest.mock(
  '../../../smart-core/src/facades/replace-id-in-feature-parents.function',
);

const testFeature = 'testFeature';
const testEntity = 'testEntity';
const mockParentIds = ['456'];

interface MockReplaceIdModule {
  replaceIdInFeatureParents: jest.Mock;
}

describe('removeIdFromParentsSignals', () => {
  let mockSignalsFacade: Partial<SignalsFacade>;
  let childDefinition: BaseChildDefinition;
  let parentInfo: ParentInfo[];
  let mockReplaceIdInFeatureParents: jest.Mock;

  beforeEach(() => {
    mockSignalsFacade = {
      entityState: {
        entityMap: jest.fn().mockReturnValue(new Map()),
      } as unknown as SignalsFacade['entityState'],
    };

    mockReplaceIdInFeatureParents = jest.fn().mockReturnValue(mockParentIds);
    const mockModule = jest.requireMock<MockReplaceIdModule>(
      './replace-id-in-parents-signals.function',
    );
    mockModule.replaceIdInFeatureParents = mockReplaceIdInFeatureParents;

    (facadeRegistry.register as jest.Mock).mockReturnValue(mockSignalsFacade);

    childDefinition = {
      parentFeature: testFeature,
      parentEntity: testEntity,
      parentField: 'id' as keyof SmartNgRXRowBase,
    } as BaseChildDefinition;

    parentInfo = [];
  });

  it('should not add parent info when matching parent already exists', () => {
    // Arrange
    const id = '123';
    const existingParentInfo: ParentInfo = {
      feature: testFeature,
      entity: testEntity,
      ids: mockParentIds,
    };
    parentInfo.push(existingParentInfo);

    // Act
    removeIdFromParentsSignals(childDefinition, id, parentInfo);

    // Assert
    expect(parentInfo).toHaveLength(1);
    expect(parentInfo[0]).toBe(existingParentInfo);
  });
});
