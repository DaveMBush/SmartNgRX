import { Injectable } from '@angular/core';
import { handleSocketNotification } from '@smarttools/smart-signals';
import { io, Socket } from 'socket.io-client';

// We need to create this service using a factory so we can call init()
// after the service is created so we don't provideIn: 'root'
@Injectable()
export class SocketService {
  url = 'ws://localhost:3000/data';
  client!: Socket;

  init(): void {
    this.client = io(this.url);
    this.client.on('message', this.message.bind(this));
  }

  message(data: { ids: string[]; table: string; action: string }): void {
    switch (data.table) {
      case 'docs':
        data.table = 'departmentChildren';
        data.ids = data.ids.map(function mapDocsIds(id) {
          return `docs:${id}`;
        });
        break;
      case 'lists':
        data.table = 'departmentChildren';
        data.ids = data.ids.map(function mapListsIds(id) {
          return `lists:${id}`;
        });
        break;
      case 'folders':
        data.table = 'departmentChildren';
        data.ids = data.ids.map(function mapFoldersIds(id) {
          return `folders:${id}`;
        });
        break;
      case 'sprintFolders':
        data.table = 'departmentChildren';
        data.ids = data.ids.map(function mapSprintFoldersIds(id) {
          return `sprint-folders:${id}`;
        });
        break;
      default:
        break;
    }
    handleSocketNotification(data.table, data.action, data.ids);
  }
}
