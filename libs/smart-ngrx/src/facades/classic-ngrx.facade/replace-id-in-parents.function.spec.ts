import { of } from 'rxjs';

import { facadeRegistry } from '../../../../smart-core/src/registrations/facade-registry.class';
import { ChildDefinition } from '../../../../smart-core/src/types/child-definition.interface';
import { FacadeBase } from '../../../../smart-core/src/facades/facade.base';
import { replaceIdInFeatureParents } from '../../../../smart-core/src/facades/replace-id-in-feature-parents.function';
import { replaceIdInParents } from './replace-id-in-parents.function';

// Mock dependencies
jest.mock('../../registrations/facade-registry.class');
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
      .spyOn(facadeRegistry, 'register')
      .mockReturnValue(mockParentService as unknown as FacadeBase);

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
