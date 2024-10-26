import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from, map, Observable, of } from 'rxjs';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { TopDTO } from './top-dto.interface';

@Controller('top')
export class TopController {
  constructor(
    @Inject(prismaServiceToken)
    private prisma: PrismaClient,
  ) {}

  @Post()
  getByIds(@Body() ids: string[]): Observable<TopDTO[]> {
    if (ids.length === 0) {
      return of([]);
    }
    return from(
      this.prisma.locations.findMany({
        select: {
          id: true,
        },
        orderBy: { created: 'asc' },
      }),
    ).pipe(
      map((locations) => {
        return [
          {
            id: ids[0],
            locations: locations.map((location) => location.id),
          },
        ];
      }),
    );
  }
}
