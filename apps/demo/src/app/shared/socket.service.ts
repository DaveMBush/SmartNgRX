import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { handleSocketNotification } from '@smart/smart-ngrx/socket/handle-socket-notification.function';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  url = 'ws://localhost:3000/data';
  client: Socket;

  constructor() {
    this.client = io(this.url);
    this.client.on('message', this.message.bind(this));
  }

  message(data: { ids: string[]; table: string; action: string }): void {
    switch (data.table) {
      case 'docs':
        data.table = 'departmentChildren';
        data.ids = data.ids.map((id) => `docs:${id}`);
        break;
      case 'lists':
        data.table = 'departmentChildren';
        data.ids = data.ids.map((id) => `lists:${id}`);
        break;
      case 'folders':
        data.table = 'departmentChildren';
        data.ids = data.ids.map((id) => `folders:${id}`);
        break;
      case 'sprintFolders':
        data.table = 'departmentChildren';
        data.ids = data.ids.map((id) => `sprint-folders:${id}`);
        break;
      default:
        break;
    }
    handleSocketNotification(data.table, data.action, data.ids);
  }
}
