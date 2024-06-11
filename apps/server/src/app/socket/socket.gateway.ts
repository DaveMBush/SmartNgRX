import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { CUDMessage } from './cud-message.interface';

@WebSocketGateway({cors: true, namespace: 'data'})
export class SocketGateway {
  @WebSocketServer() server!: Server;

  sendNotification(message: CUDMessage): void {
    this.server.emit('message', message);
  }

}
