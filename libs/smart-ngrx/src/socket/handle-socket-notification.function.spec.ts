// unit tests for handleSocketNotification function
import { psi } from '../common/psi.const';
import { markAndDeleteEntities } from '../mark-and-delete/mark-and-delete-entities.class';
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

  beforeEach(() => {
    featureRegistry.registerFeature(feature);
    jest
      .spyOn(markAndDeleteEntities, 'entities')
      .mockReturnValue(featureEntityKeys);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call deleteEntity when action is delete', () => {
    handleSocketNotification(table, 'delete', ids);
    expect(deleteEntity).toHaveBeenCalledWith(feature, table, ids);
  });

  it('should call updateEntity when action is update', () => {
    handleSocketNotification(table, 'update', ids);
    expect(updateEntity).toHaveBeenCalledWith(feature, table, ids);
  });
  it('should not call any function when action is not delete or update', () => {
    expect(() => handleSocketNotification(table, 'create', ids)).toThrow();
  });
});
