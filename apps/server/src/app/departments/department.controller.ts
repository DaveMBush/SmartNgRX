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
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { SocketGateway } from '../socket/socket.gateway';
import { consolidateChildren } from './consolidate-children.function';
import { DepartmentDTO } from './department-dto.interface';

@Controller('departments')
export class DepartmentsController {
  constructor(
    @Inject(prismaServiceToken) private prisma: PrismaClient,
    private gateway: SocketGateway,
  ) {}

  @Put()
  update(@Body() department: DepartmentDTO): Observable<DepartmentDTO[]> {
    return from(
      this.prisma.departments.update({
        where: { id: department.id },
        data: { name: department.name },
      }),
    ).pipe(
      switchMap(() => this.getByIds([department.id])),
      tap(() =>
        this.gateway.sendNotification({
          ids: [department.id],
          action: 'update',
          table: 'departments',
        }),
      ),
    );
  }

  @Post()
  getByIds(@Body() ids: string[]): Observable<DepartmentDTO[]> {
    return from(
      this.prisma.departments.findMany({
        where: { id: { in: ids } },
        select: {
          id: true,
          name: true,
          docs: {
            select: { did: true, created: true },
            orderBy: { created: 'asc' },
          },
          folders: {
            select: { id: true, created: true },
            orderBy: { created: 'asc' },
          },
          sprintFolders: {
            select: { id: true, created: true },
            orderBy: { created: 'asc' },
          },
          lists: {
            select: { id: true, created: true },
            orderBy: { created: 'asc' },
          },
        },
      }),
    ).pipe(map(consolidateChildren));
  }

  @Post('add')
  add(@Body() department: DepartmentDTO): Observable<DepartmentDTO[]> {
    return from(
      this.prisma.departments.create({
        data: {
          name: department.name,
          locationId: department.parentId!,
        },
      }),
    ).pipe(
      switchMap((result) => this.getByIds([result.id])),
      tap(() =>
        this.gateway.sendNotification({
          ids: [department.parentId!],
          action: 'update',
          table: 'locations',
        }),
      ),
    );
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Observable<void> {
    return from(this.prisma.departments.delete({ where: { id } })).pipe(
      map(() => undefined),
      tap(() =>
        this.gateway.sendNotification({
          ids: [id],
          action: 'delete',
          table: 'departments',
        }),
      ),
    );
  }

  @Post('indexes')
  async getByIndexes(@Body() definition: { parentId: string, childField: string, startIndex: number, length: number }): Promise<{
    /** starting index for the ids to be filled into the virtual array */
    startIndex: number;
    /** the ids to put into the virtual array */
    indexes: string[];
    /** the total number of ids in the virtual array */
    total: number;
}> {
    // there is only one child field so we can ignore that.
    const result = await this.prisma.$queryRaw`SELECT id from (SELECT folders.departmentId, folders.id, folders.name, folders.created FROM folders
UNION ALL SELECT docs.departmentId, docs.did, docs.created FROM docs
UNION ALL SELECT sprintFolders.departmentId, sprintFolders.id, sprintFolders.created FROM sprintFolders
UNION ALL SELECT lists.departmentId, lists.id, lists.created from lists)
WHERE departmentId = ${definition.parentId}
ORDER BY created
LIMIT ${definition.length} OFFSET ${definition.startIndex};`;
    const total = await this.prisma.$queryRaw`SELECT count() from (SELECT folders.departmentId FROM folders
UNION ALL SELECT docs.departmentId FROM docs
UNION ALL SELECT sprintFolders.departmentId FROM sprintFolders
UNION ALL SELECT lists.departmentId from lists)
WHERE departmentId = ${definition.parentId};`
    return {
      indexes: result as string[],
      startIndex: definition.startIndex,
      total: total as number
    }
  }
}
