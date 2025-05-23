import { handleSocketNotification as handleSocketNotificationSpy } from '@smarttools/smart-signals';

import { SocketService } from './socket.service';

jest.mock('@smarttools/smart-signals', () => ({
  handleSocketNotification: jest.fn(),
}));

describe('SocketService', () => {
  let service: SocketService;

  beforeAll(() => {
    service = new SocketService();
  });

  describe('when table is docs', () => {
    it('should call handleSocketNotification with departmentChildren and Ids should be modified to docs:id', () => {
      service.message({
        ids: ['1'],
        table: 'docs',
        action: 'update',
      });
      expect(handleSocketNotificationSpy).toHaveBeenCalledWith(
        'departmentChildren',
        'update',
        ['docs:1'],
      );
    });
  });
  describe('when table is lists', () => {
    it('should call handleSocketNotification with departmentChildren and Ids should be modified to lists:id', () => {
      service.message({
        ids: ['1'],
        table: 'lists',
        action: 'update',
      });
      expect(handleSocketNotificationSpy).toHaveBeenCalledWith(
        'departmentChildren',
        'update',
        ['lists:1'],
      );
    });
  });
  describe('when table is folders', () => {
    it('should call handleSocketNotification with departmentChildren and Ids should be modified to folders:id', () => {
      service.message({
        ids: ['1'],
        table: 'folders',
        action: 'update',
      });
      expect(handleSocketNotificationSpy).toHaveBeenCalledWith(
        'departmentChildren',
        'update',
        ['folders:1'],
      );
    });
  });
  describe('when table is sprintFolders', () => {
    it('should call handleSocketNotification with departmentChildren and Ids should be modified to sprint-folders:id', () => {
      service.message({
        ids: ['1'],
        table: 'sprintFolders',
        action: 'update',
      });
      expect(handleSocketNotificationSpy).toHaveBeenCalledWith(
        'departmentChildren',
        'update',
        ['sprint-folders:1'],
      );
    });
  });
  describe('when table is not docs, lists, folders, or sprintFolders', () => {
    it('should call handleSocketNotification with the same table and ids', () => {
      service.message({
        ids: ['1'],
        table: 'other',
        action: 'update',
      });
      expect(handleSocketNotificationSpy).toHaveBeenCalledWith(
        'other',
        'update',
        ['1'],
      );
    });
  });
});
