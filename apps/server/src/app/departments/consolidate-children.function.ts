import { idToString } from '../functions/id-to-string.function';
import { toIdType } from '../functions/to-id-type.function';
import { WithCreatedDate } from '../functions/with-created-date.interface';
import { DepartmentDTO } from './department-dto.interface';

function toDepartmentChild(
  type: string,
): (p: { id: string; created: Date }) => WithCreatedDate {
  return (v: { id: string; created: Date }): WithCreatedDate => {
    return { type, id: v.id, created: v.created };
  };
}

function createdSort(a: WithCreatedDate, b: WithCreatedDate): number {
  return a.created.getTime() - b.created.getTime();
}

export function consolidateChildren(
  departments: {
    id: string;
    name: string;
    docs: { did: string; created: Date }[];
    folders: { id: string; created: Date }[];
    sprintFolders: { id: string; created: Date }[];
    lists: { id: string; created: Date }[];
  }[],
): DepartmentDTO[] {
  return departments.map((department) => ({
    id: department.id,
    name: department.name,
    // Since Prisma doesn't support views, we artificially create one here.
    children: [
      ...department.docs.map(idToString('did')).map(toDepartmentChild('docs')),
      ...department.folders.map(idToString()).map(toDepartmentChild('folders')),
      ...department.sprintFolders
        .map(idToString())
        .map(toDepartmentChild('sprint-folders')),
      ...department.lists.map(idToString()).map(toDepartmentChild('lists')),
    ]
      .sort(createdSort)
      .map(toIdType),
    // since we aren't returning the IDs, we can just count them
    virtualChildren: [
      ...department.docs,
      ...department.folders,
      ...department.sprintFolders,
      ...department.lists,
    ].length,
  }));
}
