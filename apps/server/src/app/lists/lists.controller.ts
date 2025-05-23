// jscpd:ignore-start
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from, Observable, switchMap, tap } from 'rxjs';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { SocketGateway } from '../socket/socket.gateway';
import { socketGatewayToken } from '../socket/socket-gateway.token';
import { ListDTO } from './lists-dto.interface';
// jscpd:ignore-end

@Controller('lists')
export class ListsController {
  constructor(
    @Inject(prismaServiceToken)
    private prisma: PrismaClient,
    @Inject(socketGatewayToken)
    private gateway: SocketGateway,
  ) {}

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
      this.prisma.lists.update({
        where: { id: list.id },
        data: { name: list.name },
      }),
    ).pipe(
      switchMap(async () => this.getByIds([list.id])),
      tap(() =>
        this.gateway.sendNotification({
          ids: [list.id],
          action: 'update',
          table: 'lists',
        }),
      ),
    );
  }

  @Post('add')
  async add(@Body() list: ListDTO): Promise<ListDTO[]> {
    const result = await this.prisma.lists.create({
      data: {
        name: list.name,
        departmentId: list.parentId!,
      },
    });
    this.gateway.sendNotification({
      ids: [list.parentId!],
      action: 'update',
      table: 'departments',
    });
    return this.getByIds([result.id]);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.prisma.lists.delete({ where: { id } });
    this.gateway.sendNotification({
      ids: [id],
      action: 'delete',
      table: 'lists',
    });
  }
}
