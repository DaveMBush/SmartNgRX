import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketGateway } from '../socket/socket.gateway';
import { SprintFoldersController } from './sprint-folders.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SprintFoldersController],
  providers: [SocketGateway],
})
export class SprintFoldersModule {}
