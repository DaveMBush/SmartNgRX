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
import { DocInDTO, DocOutDTO } from './doc-dto.interface';
// jscpd:ignore-end

@Controller('docs')
export class DocsController {
  constructor(
    @Inject(prismaServiceToken)
    private prisma: PrismaClient,
    private gateway: SocketGateway,
  ) {}

  @Put()
  update(@Body() doc: DocInDTO): Observable<DocOutDTO[]> {
    return from(
      this.prisma.docs.update({
        where: { did: doc.id },
        data: { name: doc.name },
      }),
    ).pipe(
      switchMap(async () => this.getByIds([doc.id!])),
      tap(() =>
        this.gateway.sendNotification({
          ids: [doc.id!],
          action: 'update',
          table: 'docs',
        }),
      ),
    );
  }

  @Post()
  async getByIds(@Body() ids: string[]): Promise<DocOutDTO[]> {
    return this.prisma.docs.findMany({
      where: { did: { in: ids } },
      select: {
        did: true,
        name: true,
      },
    });
  }

  @Post('add')
  async add(@Body() doc: DocInDTO): Promise<DocOutDTO[]> {
    const result = await this.prisma.docs.create({
      data: {
        name: doc.name,
        departmentId: doc.parentId!,
      },
    });
    this.gateway.sendNotification({
      ids: [doc.parentId!],
      action: 'update',
      table: 'departments',
    });

    return this.getByIds([result.did]);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.prisma.docs.delete({ where: { did: id } });
    this.gateway.sendNotification({
      ids: [id],
      action: 'delete',
      table: 'docs',
    });
  }
}
