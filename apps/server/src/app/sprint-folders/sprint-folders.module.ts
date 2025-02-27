import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketModule } from '../socket/socket.module';
import { SprintFoldersController } from './sprint-folders.controller';

@Module({
  imports: [PrismaModule, SocketModule],
  controllers: [SprintFoldersController],
  providers: [],
})
export class SprintFoldersModule {}
