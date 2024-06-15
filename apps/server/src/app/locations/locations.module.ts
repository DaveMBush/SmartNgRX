import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { SocketGateway } from '../socket/socket.gateway';
import { LocationsController } from './locations.controller';

@Module({
  imports: [PrismaModule],
  controllers: [LocationsController],
  providers: [SocketGateway],
})
export class LocationsModule {}
