import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketGateway } from '../socket/socket.gateway';
import { DepartmentsController } from './department.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DepartmentsController],
  providers: [SocketGateway],
})
export class DepartmentsModule {}
