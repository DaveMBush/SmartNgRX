// unit tests for handleSocketNotification function
import { psi } from '../common/psi.const';
import { markAndDeleteEntities } from '../mark-and-delete/mark-and-delete-entity.map';
import { deleteEntity } from './delete-entity.function';
import { handleSocketNotification } from './handle-socket-notification.function';
import { updateEntity } from './update-entity.function';

jest.mock('./delete-entity.function');
jest.mock('./update-entity.function');
jest.mock('../mark-and-delete/mark-and-delete-entity.map');

describe('handleSocketNotification', () => {
  const table = 'table';
  const ids = ['1', '2'];
  const feature = 'feature';
  const featureEntityKeys = [feature + psi + table];

  beforeEach(() => {
    (markAndDeleteEntities as jest.Mock).mockReturnValue(featureEntityKeys);
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
