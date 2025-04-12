import {
  BaseChildDefinition,
  FacadeBase,
  facadeRegistry,
  ParentInfo,
  replaceIdInFeatureParents,
} from '@smarttools/core';
import { of } from 'rxjs';

import { removeIdFromParentsClassic } from './remove-id-from-parents-classic.function';

// Mock dependencies
jest.mock('../../registrations/facade-registry.class');
jest.mock('./replace-id-in-feature-parents.function');

describe('removeIdFromParents', () => {
  const mockChildDefinition = {
    parentFeature: 'testFeature',
    parentEntity: 'testEntity',
  } as BaseChildDefinition;
  const mockId = 'testId';
  let mockParentInfo: ParentInfo[] = [];
  const mockParentService = {
    entities: of([{ id: 'parent1' }, { id: 'parent2' }]),
  };
  const mockReplaceIdResult = ['parent1', 'parent2'];

  let actionServiceRegistryRegisterSpy: jest.SpyInstance;
  beforeEach(() => {
    actionServiceRegistryRegisterSpy = jest
      .spyOn(facadeRegistry, 'register')
      .mockReturnValue(mockParentService as unknown as FacadeBase);
    (replaceIdInFeatureParents as jest.Mock).mockReturnValue(
      mockReplaceIdResult,
    );
    mockParentInfo = [];
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call actionServiceRegistry with correct parameters', () => {
    removeIdFromParentsClassic(mockChildDefinition, mockId, mockParentInfo);

    expect(actionServiceRegistryRegisterSpy).toHaveBeenCalledWith(
      mockChildDefinition.parentFeature,
      mockChildDefinition.parentEntity,
    );
  });

  it('should call replaceIdInFeatureParents with correct parameters', () => {
    removeIdFromParentsClassic(mockChildDefinition, mockId, mockParentInfo);

    expect(replaceIdInFeatureParents).toHaveBeenCalledWith(
      [{ id: 'parent1' }, { id: 'parent2' }],
      mockChildDefinition,
      mockParentService,
      [mockId, null],
    );
  });

  it('should add parent info to parentInfo array if not already present', () => {
    removeIdFromParentsClassic(mockChildDefinition, mockId, mockParentInfo);

    expect(mockParentInfo).toEqual([
      {
        feature: mockChildDefinition.parentFeature,
        entity: mockChildDefinition.parentEntity,
        ids: mockReplaceIdResult,
      },
    ]);
  });

  it('should not add parent info if already present in parentInfo array', () => {
    const existingParentInfo = [
      {
        feature: mockChildDefinition.parentFeature,
        entity: mockChildDefinition.parentEntity,
        ids: ['existingId'],
      },
    ];

    removeIdFromParentsClassic(mockChildDefinition, mockId, existingParentInfo);

    expect(existingParentInfo).toEqual([
      {
        feature: mockChildDefinition.parentFeature,
        entity: mockChildDefinition.parentEntity,
        ids: ['existingId'],
      },
    ]);
  });

  it('should throw an error when ActionService.init() fails', () => {
    (facadeRegistry.register as jest.Mock).mockReturnValue(null);

    expect(() =>
      removeIdFromParentsClassic(mockChildDefinition, mockId, mockParentInfo),
    ).toThrow();

    expect(mockParentInfo).toEqual([]);
  });
});
