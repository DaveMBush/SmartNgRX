import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketModule } from '../socket/socket.module';
import { DepartmentsController } from './department.controller';

@Module({
  imports: [PrismaModule, SocketModule],
  controllers: [DepartmentsController],
})
export class DepartmentsModule {}
