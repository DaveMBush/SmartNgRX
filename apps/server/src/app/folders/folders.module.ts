import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketGateway } from '../socket/socket.gateway';
import { FoldersController } from './folders.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FoldersController],
  providers: [SocketGateway],
})
export class FoldersModule {}
