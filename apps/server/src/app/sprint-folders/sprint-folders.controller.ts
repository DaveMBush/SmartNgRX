import { Body, Controller, Delete, Inject, Post, Put } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from, Observable, switchMap } from 'rxjs';

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
        version: true,
      },
    });
  }

  @Put()
  update(@Body() sprintFolder: SprintFolderDTO): Observable<SprintFolderDTO[]> {
    return from(
      this.prisma.docs.update({
        where: { did: sprintFolder.id },
        data: { name: sprintFolder.name },
      }),
    ).pipe(switchMap(async () => this.getByIds([sprintFolder.id])));
  }

  @Post('add')
  async add(@Body() sprintFolder: SprintFolderDTO): Promise<SprintFolderDTO[]> {
    const result = await this.prisma.lists.create({
      data: {
        name: sprintFolder.name,
        departmentId: sprintFolder.parentId!,
      },
    });
    return this.getByIds([result.id]);
  }

  @Delete(':id')
  async delete(id: string): Promise<void> {
    await this.prisma.sprintFolders.delete({ where: { id } });
  }
}
