import { of } from 'rxjs';

import { actionServiceRegistry } from '../registrations/action-service-registry.class';
import { ChildDefinition } from '../types/child-definition.interface';
import { ActionService } from './action.service';
import { replaceIdInFeatureParents } from './replace-id-in-feature-parents.function';
import { replaceIdInParents } from './replace-id-in-parents.function';

// Mock dependencies
jest.mock('../registrations/action-service-registry.class');
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

  it('should call replaceIdInFeatureParents when actionServiceRegistry returns a service', () => {
    const mockEntities = [{ id: '1' }, { id: '2' }];
    const mockParentService = {
      entities: of(mockEntities),
    };
    const actionServiceRegistrySpy = jest
      .spyOn(actionServiceRegistry, 'register')
      .mockReturnValue(mockParentService as unknown as ActionService);

    replaceIdInParents(mockChildDefinition, mockId, mockNewId);

    expect(actionServiceRegistrySpy).toHaveBeenCalledWith(
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
