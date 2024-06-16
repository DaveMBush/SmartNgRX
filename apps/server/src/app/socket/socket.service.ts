import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { CUDMessage } from './cud-message.interface';

@Injectable()
export class SocketService {
  handleConnection(socket: Socket): void {
    socket.on('emit', (data: CUDMessage) => {
      socket.emit('message', data);
    });
  }
}
