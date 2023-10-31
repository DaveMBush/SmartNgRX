import { Controller, Get } from '@nestjs/common';

import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationsService) {}
  @Get()
  getAll(): { message: string } {
    return this.locationService.getAll();
  }
}
