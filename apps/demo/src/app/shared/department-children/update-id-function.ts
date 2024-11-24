import { DepartmentChild } from './department-child.interface';

export function updateId(
  rows: DepartmentChild[],
  type: string,
  /* istanbul ignore next -- not a true condition */
  idName = 'id',
): DepartmentChild[] {
  return rows.map(function updateIdMapRow(row) {
    const id = row[idName as keyof DepartmentChild] as string;
    return {
      ...row,
      id: `${type}:${id}`,
    };
  });
}
