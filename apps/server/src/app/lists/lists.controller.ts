import { Body, Controller, Delete, Inject, Post, Put } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from, Observable, switchMap } from 'rxjs';

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
        version: true,
        name: true,
      },
    });
  }

  @Put()
  update(@Body() list: ListDTO): Observable<ListDTO[]> {
    return from(
      this.prisma.docs.update({
        where: { did: list.id },
        data: { name: list.name },
      }),
    ).pipe(switchMap(async () => this.getByIds([list.id])));
  }

  @Post('add')
  async add(@Body() list: ListDTO): Promise<ListDTO[]> {
    const result = await this.prisma.lists.create({
      data: {
        name: list.name,
        departmentId: list.parentId!,
      },
    });
    return this.getByIds([result.id]);
  }

  @Delete(':id')
  async delete(id: string): Promise<void> {
    await this.prisma.lists.delete({ where: { id } });
  }
}
