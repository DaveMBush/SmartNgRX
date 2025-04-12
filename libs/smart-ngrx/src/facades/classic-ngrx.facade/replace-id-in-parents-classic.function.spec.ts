import {
  BaseChildDefinition,
  FacadeBase,
  facadeRegistry,
  replaceIdInFeatureParents,
} from '@smarttools/core';
import { of } from 'rxjs';

import { replaceIdInParentsClassic } from './replace-id-in-parents-classic.function';

// Mock dependencies
jest.mock('../registrations/facade-registry.class');
jest.mock('./replace-id-in-feature-parents.function');

describe('replaceIdInParents', () => {
  const mockChildDefinition = {
    parentFeature: 'testFeature',
    parentEntity: 'testEntity',
  } as BaseChildDefinition;
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

    replaceIdInParentsClassic(mockChildDefinition, mockId, mockNewId);

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
