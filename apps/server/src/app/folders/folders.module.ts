import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketModule } from '../socket/socket.module';
import { FoldersController } from './folders.controller';

@Module({
  imports: [PrismaModule, SocketModule],
  controllers: [FoldersController],
})
export class FoldersModule {}
