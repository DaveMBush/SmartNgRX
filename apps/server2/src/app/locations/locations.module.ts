import { Module } from '@nestjs/common';

import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
