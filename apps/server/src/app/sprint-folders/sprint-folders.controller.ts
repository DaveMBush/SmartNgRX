import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { SprintFolderDTO } from './sprint-folders-dto.interface';

@Controller('sprintFolders')
export class SprintFoldersController {
  constructor(@Inject(prismaServiceToken) private prisma: PrismaClient) {}

  @Post()
  async getByIds(@Body() ids: string[]): Promise<SprintFolderDTO[]> {
    return this.prisma.sprintFolders.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
