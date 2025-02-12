// unit tests for handleSocketNotification function
import { psi } from '../common/psi.const';
import { markAndDeleteEntities } from '../mark-and-delete/mark-and-delete-entities.class';
import { facadeRegistry } from '../registrations/facade-registry.class';
import { featureRegistry } from '../registrations/feature-registry.class';
import { deleteEntity } from './delete-entity.function';
import { handleSocketNotification } from './handle-socket-notification.function';
import { updateEntity } from './update-entity.function';

jest.mock('./delete-entity.function');
jest.mock('./update-entity.function');

describe('handleSocketNotification', () => {
  const table = 'table';
  const ids = ['1', '2'];
  const feature = 'feature';
  const featureEntityKeys = [feature + psi + table];
  let hasActionServiceSpy: jest.SpyInstance;

  beforeEach(() => {
    featureRegistry.registerFeature(feature);
    jest
      .spyOn(markAndDeleteEntities, 'entities')
      .mockReturnValue(featureEntityKeys);
    hasActionServiceSpy = jest
      .spyOn(facadeRegistry, 'hasActionService')
      .mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call deleteEntity when action is delete', () => {
    handleSocketNotification(table, 'delete', ids);
    expect(deleteEntity).toHaveBeenCalledWith(feature, table, ids);
    expect(hasActionServiceSpy).toHaveBeenCalledWith(feature, table);
  });

  it('should call updateEntity when action is update', () => {
    handleSocketNotification(table, 'update', ids);
    expect(updateEntity).toHaveBeenCalledWith(feature, table, ids);
    expect(hasActionServiceSpy).toHaveBeenCalledWith(feature, table);
  });

  it('should throw error when action is not delete or update', () => {
    expect(() => handleSocketNotification(table, 'create', ids)).toThrow(
      'Error: invalid action create',
    );
  });

  it('should not call any function when feature is not registered', () => {
    hasActionServiceSpy.mockReturnValue(false);
    handleSocketNotification(table, 'delete', ids);
    expect(deleteEntity).not.toHaveBeenCalled();
  });
});
