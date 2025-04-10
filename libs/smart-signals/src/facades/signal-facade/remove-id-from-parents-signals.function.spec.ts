import {
  ChildDefinition,
  facadeRegistry,
  ParentInfo,
  SmartNgRXRowBase,
} from '@smarttools/core';

import { SignalsFacade } from '../signals-facade';
import { removeIdFromParentsSignals } from './remove-id-from-parents-signals.function';

jest.mock('../../registrations/facade-registry.class');
jest.mock('../classic-ngrx.facade/replace-id-in-feature-parents.function');

const testFeature = 'testFeature';
const testEntity = 'testEntity';
const mockParentIds = ['456'];

interface MockReplaceIdModule {
  replaceIdInFeatureParents: jest.Mock;
}

describe('removeIdFromParentsSignals', () => {
  let mockSignalsFacade: Partial<SignalsFacade>;
  let childDefinition: ChildDefinition;
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
      '../classic-ngrx.facade/replace-id-in-feature-parents.function',
    );
    mockModule.replaceIdInFeatureParents = mockReplaceIdInFeatureParents;

    (facadeRegistry.register as jest.Mock).mockReturnValue(mockSignalsFacade);

    childDefinition = {
      type: 'Signal',
      parentFeature: testFeature,
      parentEntity: testEntity,
      parentField: 'id' as keyof SmartNgRXRowBase,
    } as ChildDefinition;

    parentInfo = [];
  });

  it('should add parent info when no matching parent exists', () => {
    // Arrange
    const id = '123';

    // Act
    removeIdFromParentsSignals(childDefinition, id, parentInfo);

    // Assert
    expect(parentInfo).toHaveLength(1);
    expect(parentInfo[0]).toEqual({
      feature: childDefinition.parentFeature,
      entity: childDefinition.parentEntity,
      ids: mockParentIds,
    });
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

  it('should check for existing parent info with correct feature and entity', () => {
    // Arrange
    const id = '123';
    const differentParentInfo: ParentInfo = {
      feature: 'differentFeature',
      entity: 'differentEntity',
      ids: ['789'],
    };
    parentInfo.push(differentParentInfo);

    // Act
    removeIdFromParentsSignals(childDefinition, id, parentInfo);

    // Assert
    expect(parentInfo).toHaveLength(2);
    expect(parentInfo[1]).toEqual({
      feature: childDefinition.parentFeature,
      entity: childDefinition.parentEntity,
      ids: mockParentIds,
    });
  });
});
