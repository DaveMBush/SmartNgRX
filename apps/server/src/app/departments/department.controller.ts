import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { prismaServiceToken } from '../orm/prisma-service.token';
import { SocketGateway } from '../socket/socket.gateway';
import { DepartmentDTO } from './department-dto.interface';

interface DepartmentNameAndId {
  name: string;
  id: string;
}

interface DepartmentNameIdAndChildren {
  name: string;
  id: string;
  children: {
    startIndex: number;
    indexes: string[];
    length: number;
  };
}

@Controller('departments')
export class DepartmentsController {
  constructor(
    @Inject(prismaServiceToken)
    private prisma: PrismaClient,
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
        },
      }),
    ).pipe(
      mergeMap((departments) => {
        return this.getDepartmentChildrenIndexes(departments);
      }),
    );
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
  async getByIndexes(
    @Body()
    definition: {
      parentId: string;
      childField: string;
      startIndex: number;
      length: number;
    },
  ): Promise<{
    /** starting index for the ids to be filled into the virtual array */
    startIndex: number;
    /** the ids to put into the virtual array */
    indexes: string[];
    /** the total number of ids in the virtual array */
    length: number;
  }> {
    // there is only one child field so we can ignore that.
    const result = await this.prisma.$queryRaw`SELECT id from (
SELECT folders.departmentId, ('folders:' || folders.id) as id, folders.created FROM folders
UNION ALL SELECT docs.departmentId, ('docs:' || docs.did) as id, docs.created FROM docs
UNION ALL SELECT sprintFolders.departmentId, ('sprint-folders:' || sprintFolders.id) as id, sprintFolders.created FROM sprintFolders
UNION ALL SELECT lists.departmentId, ('lists:' || lists.id) as id, lists.created from lists)
WHERE departmentId = ${definition.parentId}
ORDER BY created
LIMIT ${definition.length} OFFSET ${definition.startIndex};`;
    const total = await this.prisma.$queryRaw`SELECT count(*) as total from (
SELECT folders.departmentId FROM folders
UNION ALL SELECT docs.departmentId FROM docs
UNION ALL SELECT sprintFolders.departmentId FROM sprintFolders
UNION ALL SELECT lists.departmentId from lists)
WHERE departmentId = ${definition.parentId};`;
    // use Number to convert BigInt
    return {
      indexes: (result as { id: string }[]).map((i) => i.id),
      startIndex: Number(definition.startIndex),
      length: Number((total as { total: unknown }[])[0].total),
    };
  }

  private async getBatchIndexes(
    @Body()
    definitions: {
      parentId: string;
      childField: string;
      startIndex: number;
      length: number;
    }[],
  ): Promise<
    Record<
      string,
      {
        startIndex: number;
        indexes: string[];
        length: number;
      }
    >
  > {
    if (definitions.length === 0) {
      return {};
    }
    const parentIds = definitions.map((def) => def.parentId);
    const result = await this.getBatchIndexesSQL(parentIds);

    return result.reduce<
      Record<string, { startIndex: number; indexes: string[]; length: number }>
    >((acc, { departmentId, indexes, total }) => {
      acc[departmentId] = {
        startIndex: 0,
        indexes: indexes.split(','),
        length: Number(total),
      };
      return acc;
    }, {});
  }

  private async getBatchIndexesSQL(
    parentIds: string[],
  ): Promise<{ departmentId: string; indexes: string; total: number }[]> {
    return this.prisma.$queryRaw`WITH all_items AS (
      SELECT folders.departmentId, ('folders:' || folders.id) as id, folders.created FROM folders
      UNION ALL SELECT docs.departmentId, ('docs:' || docs.did) as id, docs.created FROM docs
      UNION ALL SELECT sprintFolders.departmentId, ('sprint-folders:' || sprintFolders.id) as id, sprintFolders.created FROM sprintFolders
      UNION ALL SELECT lists.departmentId, ('lists:' || lists.id) as id, lists.created from lists
    ),
    numbered_items AS (
      SELECT departmentId, id,
        ROW_NUMBER() OVER (PARTITION BY departmentId ORDER BY created) - 1 as row_num,
        COUNT(*) OVER (PARTITION BY departmentId) as total
      FROM all_items
      WHERE departmentId IN (${Prisma.join(parentIds)})
    )
    SELECT departmentId, GROUP_CONCAT(id) as indexes, MAX(total) as total
    FROM numbered_items
    WHERE row_num < 500
    GROUP BY departmentId;`;
  }

  private getDepartmentChildrenIndexes(
    departments: DepartmentNameAndId[],
  ): Observable<DepartmentNameIdAndChildren[]> {
    return from(
      this.getBatchIndexes(
        departments.map((dept) => ({
          parentId: dept.id,
          childField: 'children',
          startIndex: 0,
          length: 500,
        })),
      ),
    ).pipe(
      map((batchResults) =>
        departments.map((dept) => ({
          ...dept,
          children: batchResults[dept.id] ?? {
            startIndex: 0,
            indexes: [],
            length: 0,
          },
        })),
      ),
    );
  }
}
