import { of } from 'rxjs';

import { actionServiceRegistry } from '../registrations/action.service.registry';
import { ChildDefinition } from '../types/child-definition.interface';
import { replaceIdInFeatureParents } from './replace-id-in-feature-parents.function';
import { replaceIdInParents } from './replace-id-in-parents.function';

// Mock dependencies
jest.mock('../registrations/action.service.registry');
jest.mock('./replace-id-in-feature-parents.function');

describe('replaceIdInParents', () => {
  const mockChildDefinition = {
    parentFeature: 'testFeature',
    parentEntity: 'testEntity',
  } as ChildDefinition;
  const mockId = 'oldId';
  const mockNewId = 'newId';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not call replaceIdInFeatureParents when actionServiceRegistry returns null', () => {
    (actionServiceRegistry as jest.Mock).mockReturnValue(null);

    replaceIdInParents(mockChildDefinition, mockId, mockNewId);

    expect(actionServiceRegistry).toHaveBeenCalledWith(
      'testFeature',
      'testEntity',
    );
    expect(replaceIdInFeatureParents).not.toHaveBeenCalled();
  });

  it('should call replaceIdInFeatureParents when actionServiceRegistry returns a service', () => {
    const mockEntities = [{ id: '1' }, { id: '2' }];
    const mockParentService = {
      entities: of(mockEntities),
    };
    (actionServiceRegistry as jest.Mock).mockReturnValue(mockParentService);

    replaceIdInParents(mockChildDefinition, mockId, mockNewId);

    expect(actionServiceRegistry).toHaveBeenCalledWith(
      'testFeature',
      'testEntity',
    );
    expect(replaceIdInFeatureParents).toHaveBeenCalledWith(
      mockEntities,
      mockChildDefinition,
      mockParentService,
      [mockId, mockNewId],
    );
  });
});
