import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketModule } from '../socket/socket.module';
import { ListsController } from './lists.controller';

@Module({
  imports: [PrismaModule, SocketModule],
  controllers: [ListsController],
})
export class ListsModule {}
