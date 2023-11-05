import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { idToString } from '../functions/id-to-string.function';
import { prismaServiceToken } from '../orm/prisma-service.token';
import { DepartmentDTO } from './department-dto.interface';

function toDepartmentChild(
  type: string,
): (p: string) => { type: string; id: string } {
  return (id: string): { type: string; id: string } => {
    return { type, id };
  };
}

@Controller('departments')
export class DepartmentsController {
  constructor(@Inject(prismaServiceToken) private prisma: PrismaClient) {}
  @Post()
  getByIds(@Body() ids: string[]): Observable<DepartmentDTO[]> {
    return from(
      this.prisma.departments.findMany({
        where: { id: { in: ids } },
        select: {
          id: true,
          name: true,
          docs: {
            select: { did: true },
          },
          folders: {
            select: { id: true },
          },
          sprintFolders: {
            select: { id: true },
          },
          lists: {
            select: { id: true },
          },
        },
      }),
    ).pipe(
      map((departments) =>
        departments.map((department) => ({
          id: department.id,
          name: department.name,
          children: [
            ...department.docs
              .map(idToString('did'))
              .map(toDepartmentChild('docs')),
            ...department.folders
              .map(idToString())
              .map(toDepartmentChild('folders')),
            ...department.sprintFolders
              .map(idToString())
              .map(toDepartmentChild('sprint-folders')),
            ...department.lists
              .map(idToString())
              .map(toDepartmentChild('lists')),
          ],
        })),
      ),
    );
  }
}
