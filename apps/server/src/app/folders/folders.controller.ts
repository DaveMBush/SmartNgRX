// jscpd:ignore-start
import {
  Body,
  Controller,
  Delete,
  Inject,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { catchError, from, Observable, of, switchMap, tap } from 'rxjs';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { SocketGateway } from '../socket/socket.gateway';
import { FolderDTO } from './folders-dto.interface';
// jscpd:ignore-start

@Controller('folders')
export class FoldersController {
  constructor(
    @Inject(prismaServiceToken)
    private prisma: PrismaClient,
    private gateway: SocketGateway,
  ) {}

  @Post()
  async getByIds(@Body() ids: string[]): Promise<FolderDTO[]> {
    return this.prisma.folders.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
        version: true,
      },
    });
  }

  @Put()
  update(@Body() folder: FolderDTO): Observable<FolderDTO[]> {
    return from(
      this.prisma.folders.update({
        where: { id: folder.id },
        data: { name: folder.name },
      }),
    ).pipe(
      switchMap(async () => this.getByIds([folder.id])),
      tap(() =>
        this.gateway.sendNotification({
          ids: [folder.id],
          action: 'update',
          table: 'folders',
        }),
      ),
      catchError((error: unknown) => {
        Logger.error(error);
        return of([]);
      }),
    );
  }

  @Post('add')
  async add(@Body() folder: FolderDTO): Promise<FolderDTO[]> {
    const folderRow = await this.prisma.folders.create({
      data: {
        name: folder.name,
        departmentId: folder.parentId!,
      },
    });
    this.gateway.sendNotification({
      ids: [folder.parentId!],
      action: 'update',
      table: 'departments',
    });
    return this.getByIds([folderRow.id]);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.prisma.folders.delete({ where: { id } });
    this.gateway.sendNotification({
      ids: [id],
      action: 'delete',
      table: 'folders',
    });
  }
}
