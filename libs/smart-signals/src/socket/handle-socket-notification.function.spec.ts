// unit tests for handleSocketNotification function
import {
  DeleteEntity,
  facadeRegistry,
  featureRegistry,
  markAndDeleteEntities,
  psi,
} from '@smarttools/core';

import { removeIdFromParentsSignals } from '../signal-facade/remove-id-from-parents-signals.function';
import { handleSocketNotification } from './handle-socket-notification.function';
import { updateEntity } from './update-entity.function';

jest.mock('./update-entity.function');
jest.mock('@smarttools/core', () => {
  const original = jest.requireActual('@smarttools/core');
  return {
    ...original,
    DeleteEntity: jest.fn(),
  } as Record<string, unknown>;
});

describe('handleSocketNotification', () => {
  const table = 'table';
  const ids = ['1', '2'];
  const feature = 'feature';
  const featureEntityKeys = [feature + psi + table];
  let hasActionServiceSpy: jest.SpyInstance;
  let mockDeleteEntityInstance: { deleteEntity: jest.Mock };

  beforeEach(() => {
    featureRegistry.registerFeature(feature);
    jest
      .spyOn(markAndDeleteEntities, 'entities')
      .mockReturnValue(featureEntityKeys);
    hasActionServiceSpy = jest
      .spyOn(facadeRegistry, 'hasFacade')
      .mockReturnValue(true);

    mockDeleteEntityInstance = {
      deleteEntity: jest.fn(),
    };
    (DeleteEntity as jest.Mock).mockImplementation(
      () => mockDeleteEntityInstance,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call updateEntity when action is update', () => {
    handleSocketNotification(table, 'update', ids);
    expect(updateEntity).toHaveBeenCalledWith(feature, table, ids);
    expect(hasActionServiceSpy).toHaveBeenCalledWith(feature, table);
  });

  it('should create and use DeleteEntity when action is delete', () => {
    handleSocketNotification(table, 'delete', ids);

    expect(DeleteEntity).toHaveBeenCalledWith(
      feature,
      table,
      ids,
      removeIdFromParentsSignals,
    );
    expect(mockDeleteEntityInstance.deleteEntity).toHaveBeenCalled();
    expect(hasActionServiceSpy).toHaveBeenCalledWith(feature, table);
  });

  it('should throw error when action is not delete or update', () => {
    expect(() => handleSocketNotification(table, 'create', ids)).toThrow(
      'Error: invalid action create',
    );
  });
});
