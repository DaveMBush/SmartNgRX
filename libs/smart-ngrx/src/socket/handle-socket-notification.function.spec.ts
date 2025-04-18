// unit tests for handleSocketNotification function
import {
  DeleteEntity,
  facadeRegistry,
  featureRegistry,
  markAndDeleteEntities,
  psi,
} from '@smarttools/core';

import { removeIdFromParentsClassic } from '../classic-ngrx.facade/remove-id-from-parents-classic.function';
import { handleSocketNotification } from './handle-socket-notification.function';
import { updateEntity } from './update-entity.function';

jest.mock('./update-entity.function');
jest.mock('../classic-ngrx.facade/remove-id-from-parents-classic.function');

// Mock DeleteEntity class
jest.mock('@smarttools/core', () => {
  const original = jest.requireActual('@smarttools/core');
  const mockDeleteEntityInstance = {
    deleteEntity: jest.fn(),
  };
  const mockDeleteEntity = jest.fn(() => mockDeleteEntityInstance);

  return {
    ...original,
    DeleteEntity: mockDeleteEntity,
  } as Record<string, unknown>;
});

describe('handleSocketNotification', () => {
  const table = 'table';
  const ids = ['1', '2'];
  const feature = 'feature';
  const featureEntityKeys = [feature + psi + table];
  let hasActionServiceSpy: jest.SpyInstance;
  let deleteEntitySpy: jest.SpyInstance;

  beforeEach(() => {
    featureRegistry.registerFeature(feature);
    jest
      .spyOn(markAndDeleteEntities, 'entities')
      .mockReturnValue(featureEntityKeys);
    hasActionServiceSpy = jest
      .spyOn(facadeRegistry, 'hasFacade')
      .mockReturnValue(true);

    // Reset the DeleteEntity mock before each test
    (DeleteEntity as jest.Mock).mockClear();

    // Create a spy for the deleteEntity method on the instance that will be returned
    const mockDeleteEntityInstance = {
      deleteEntity: jest.fn(),
    };
    (DeleteEntity as jest.Mock).mockReturnValue(mockDeleteEntityInstance);

    // Store a reference to the spy for validation
    deleteEntitySpy = mockDeleteEntityInstance.deleteEntity;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call updateEntity when action is update', () => {
    handleSocketNotification(table, 'update', ids);
    expect(updateEntity).toHaveBeenCalledWith(feature, table, ids);
    expect(hasActionServiceSpy).toHaveBeenCalledWith(feature, table);
  });

  it('should create and call DeleteEntity when action is delete', () => {
    handleSocketNotification(table, 'delete', ids);

    // Verify DeleteEntity was constructed with correct params
    expect(DeleteEntity).toHaveBeenCalledWith(
      feature,
      table,
      ids,
      removeIdFromParentsClassic,
    );

    // Verify deleteEntity method was called using our spy
    expect(deleteEntitySpy).toHaveBeenCalled();

    expect(hasActionServiceSpy).toHaveBeenCalledWith(feature, table);
  });

  it('should throw error when action is not delete or update', () => {
    expect(() => handleSocketNotification(table, 'create', ids)).toThrow(
      'Error: invalid action create',
    );
  });
});
