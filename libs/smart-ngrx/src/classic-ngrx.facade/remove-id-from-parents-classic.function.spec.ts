import {
  BaseChildDefinition,
  facadeRegistry,
  ParentInfo,
  replaceIdInFeatureParents,
} from '@smarttools/smart-core';
import { of } from 'rxjs';

import { ClassicNgrxFacade } from './classic-ngrx.facade';
import { removeIdFromParentsClassic } from './remove-id-from-parents-classic.function';

jest.mock('@smarttools/smart-core', () => ({
  facadeRegistry: {
    register: jest.fn(),
  },
  replaceIdInFeatureParents: jest.fn(),
}));

describe('removeIdFromParentsClassic', () => {
  let mockFacade: Partial<ClassicNgrxFacade>;
  let childDefinition: BaseChildDefinition;
  let parentInfo: ParentInfo[];

  beforeEach(() => {
    jest.clearAllMocks();

    mockFacade = {
      entities: of({ entity1: { id: 'entity1' } }),
    };

    (facadeRegistry.register as jest.Mock).mockReturnValue(mockFacade);
    (replaceIdInFeatureParents as jest.Mock).mockReturnValue(['parent1']);

    childDefinition = {
      parentFeature: 'testFeature',
      parentEntity: 'testEntity',
      childFeature: 'testChildFeature',
      childEntity: 'testChildEntity',
      parentField: 'id',
    };

    parentInfo = [];
  });

  it('should call replaceIdInFeatureParents with correct parameters', () => {
    // Act
    removeIdFromParentsClassic(childDefinition, 'testId', parentInfo);

    // Assert
    expect(replaceIdInFeatureParents).toHaveBeenCalledWith(
      { entity1: { id: 'entity1' } },
      childDefinition,
      mockFacade,
      ['testId', null],
    );
  });

  it('should add entry to parentInfo when no matching entry exists', () => {
    // Act
    removeIdFromParentsClassic(childDefinition, 'testId', parentInfo);

    // Assert
    expect(parentInfo).toEqual([
      {
        feature: 'testFeature',
        entity: 'testEntity',
        ids: ['parent1'],
      },
    ]);
  });

  it('should not add entry to parentInfo when matching entry already exists', () => {
    // Arrange
    parentInfo = [
      {
        feature: 'testFeature',
        entity: 'testEntity',
        ids: ['existingParent'],
      },
    ];

    // Act
    removeIdFromParentsClassic(childDefinition, 'testId', parentInfo);

    // Assert
    expect(parentInfo).toEqual([
      {
        feature: 'testFeature',
        entity: 'testEntity',
        ids: ['existingParent'],
      },
    ]);
    expect(parentInfo.length).toBe(1);
  });

  it('should check parentInfo entries correctly with some function', () => {
    // Arrange
    parentInfo = [
      {
        feature: 'otherFeature',
        entity: 'testEntity',
        ids: ['parent1'],
      },
      {
        feature: 'testFeature',
        entity: 'otherEntity',
        ids: ['parent2'],
      },
    ];

    // Act
    removeIdFromParentsClassic(childDefinition, 'testId', parentInfo);

    // Assert
    expect(parentInfo.length).toBe(3);
    expect(parentInfo[2]).toEqual({
      feature: 'testFeature',
      entity: 'testEntity',
      ids: ['parent1'],
    });
  });
});
