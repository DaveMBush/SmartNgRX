import { Controller, Delete, Get, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { idToString } from '../functions/id-to-string.function';
import { prismaServiceToken } from '../orm/prisma-service.token';
import { LocationDTO } from './location-dto.interface';

function toLocationId({ id: id }: { id: string }): string {
  return id;
}

@Controller('locations')
export class LocationsController {
  constructor(@Inject(prismaServiceToken) private prisma: PrismaClient) {}
  @Get()
  getAll(): Observable<LocationDTO[]> {
    return from(
      this.prisma.locations.findMany({
        select: {
          id: true,
          name: true,
          departments: {
            select: { id: true },
            orderBy: { created: 'asc' },
          },
        },
      }),
    ).pipe(
      map((locations) =>
        locations.map((location) => ({
          id: location.id,
          name: location.name,
          departments: location.departments.map(idToString()).map(toLocationId),
        })),
      ),
    );
  }

  @Delete(':id')
  async delete(id: string): Promise<void> {
    await this.prisma.locations.delete({ where: { id } });
  }
}
