import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketModule } from '../socket/socket.module';
import { DocsController } from './docs.controller';

@Module({
  imports: [PrismaModule, SocketModule],
  controllers: [DocsController],
  providers: [],
})
export class DocsModule {}
