import { of } from 'rxjs';

import { actionServiceRegistry } from '../registrations/action-service-registry.class';
import { ChildDefinition } from '../types/child-definition.interface';
import { ParentInfo } from '../types/parent-info.interface';
import { ActionService } from './action.service';
import { removeIdFromParents } from './remove-id-from-parents.function';
import { replaceIdInFeatureParents } from './replace-id-in-feature-parents.function';

// Mock dependencies
jest.mock('../registrations/action-service-registry.class');
jest.mock('./replace-id-in-feature-parents.function');

describe('removeIdFromParents', () => {
  const mockChildDefinition = {
    parentFeature: 'testFeature',
    parentEntity: 'testEntity',
  } as ChildDefinition;
  const mockId = 'testId';
  let mockParentInfo: ParentInfo[] = [];
  const mockParentService = {
    entities: of([{ id: 'parent1' }, { id: 'parent2' }]),
  };
  const mockReplaceIdResult = ['parent1', 'parent2'];

  let actionServiceRegistryRegisterSpy: jest.SpyInstance;
  beforeEach(() => {
    actionServiceRegistryRegisterSpy = jest
      .spyOn(actionServiceRegistry, 'register')
      .mockReturnValue(mockParentService as unknown as ActionService);
    (replaceIdInFeatureParents as jest.Mock).mockReturnValue(
      mockReplaceIdResult,
    );
    mockParentInfo = [];
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call actionServiceRegistry with correct parameters', () => {
    removeIdFromParents(mockChildDefinition, mockId, mockParentInfo);

    expect(actionServiceRegistryRegisterSpy).toHaveBeenCalledWith(
      mockChildDefinition.parentFeature,
      mockChildDefinition.parentEntity,
    );
  });

  it('should call replaceIdInFeatureParents with correct parameters', () => {
    removeIdFromParents(mockChildDefinition, mockId, mockParentInfo);

    expect(replaceIdInFeatureParents).toHaveBeenCalledWith(
      [{ id: 'parent1' }, { id: 'parent2' }],
      mockChildDefinition,
      mockParentService,
      [mockId, null],
    );
  });

  it('should add parent info to parentInfo array if not already present', () => {
    removeIdFromParents(mockChildDefinition, mockId, mockParentInfo);

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

    removeIdFromParents(mockChildDefinition, mockId, existingParentInfo);

    expect(existingParentInfo).toEqual([
      {
        feature: mockChildDefinition.parentFeature,
        entity: mockChildDefinition.parentEntity,
        ids: ['existingId'],
      },
    ]);
  });

  it('should throw an error when ActionService.init() fails', () => {
    (actionServiceRegistry.register as jest.Mock).mockReturnValue(null);

    expect(() =>
      removeIdFromParents(mockChildDefinition, mockId, mockParentInfo),
    ).toThrow();

    expect(mockParentInfo).toEqual([]);
  });
});
