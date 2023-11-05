import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { ListDTO } from './lists-dto.interface';

@Controller('lists')
export class ListsController {
  constructor(@Inject(prismaServiceToken) private prisma: PrismaClient) {}

  @Post()
  async getByIds(@Body() ids: string[]): Promise<ListDTO[]> {
    return this.prisma.lists.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
