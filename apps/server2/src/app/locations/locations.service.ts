import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService {
  getAll(): { message: string } {
    return { message: 'Welcome from location service!' };
  }
}
