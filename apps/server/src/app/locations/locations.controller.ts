import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from, map, Observable } from 'rxjs';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { LocationDTO } from './location-dto.interface';

function departmentToId(department: { id: string }): string {
  return department.id;
}

@Controller('locations')
export class LocationsController {
  constructor(@Inject(prismaServiceToken) private prisma: PrismaClient) {}

  @Post()
  getByIds(@Body() ids: string[]): Observable<LocationDTO[]> {
    return from(
      this.prisma.locations.findMany({
        where: { id: { in: ids } },
        select: {
          id: true,
          name: true,
          version: true,
          departments: {
            select: {
              id: true,
            },
            orderBy: { created: 'asc' },
          },
        },
      }),
    ).pipe(
      map((locations) =>
        locations.map((location) => {
          return {
            id: location.id,
            name: location.name,
            version: location.version,
            departments: location.departments.map(departmentToId),
          };
        }),
      ),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.prisma.locations.delete({ where: { id } });
  }
}
