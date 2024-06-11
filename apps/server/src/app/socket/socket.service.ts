import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  handleConnection(socket: Socket): void {
    socket.on('emit', (data) => {
      socket.emit('message', data);
    });
  }
}
