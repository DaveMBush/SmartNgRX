import { Module } from '@nestjs/common';

import { PrismaModule } from '../orm/prisma.module';
import { LocationsController } from './locations.controller';

@Module({
  imports: [PrismaModule],
  controllers: [LocationsController],
  providers: [],
})
export class LocationsModule {}
