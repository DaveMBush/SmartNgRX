import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
