import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketGateway } from '../socket/socket.gateway';
import { DocsController } from './docs.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DocsController],
  providers: [SocketGateway],
})
export class DocsModule {}
