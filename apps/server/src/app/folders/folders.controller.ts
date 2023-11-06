import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { FolderDTO } from './folders-dto.interface';

@Controller('folders')
export class FoldersController {
  constructor(@Inject(prismaServiceToken) private prisma: PrismaClient) {}

  @Post()
  async getByIds(@Body() ids: string[]): Promise<FolderDTO[]> {
    return this.prisma.folders.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
