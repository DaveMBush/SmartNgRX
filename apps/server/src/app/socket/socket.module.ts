import { Global, Module } from '@nestjs/common';

import { SocketGateway } from './socket.gateway';
import { socketGatewayToken } from './socket-gateway.token';

@Global()
@Module({
  providers: [
    {
      provide: socketGatewayToken,
      useClass: SocketGateway,
    },
    SocketGateway,
  ],
  exports: [socketGatewayToken, SocketGateway],
})
export class SocketModule {}
