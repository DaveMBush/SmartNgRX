import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketGateway } from '../socket/socket.gateway';
import { ListsController } from './lists.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ListsController],
  providers: [SocketGateway],
})
export class ListsModule {}
