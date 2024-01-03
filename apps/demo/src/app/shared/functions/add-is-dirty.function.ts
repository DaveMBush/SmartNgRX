import { DepartmentChild } from '../department-children/department-child.interface';

export function addIsDirty(rows: DepartmentChild[]): DepartmentChild[] {
  return rows.map((row) => {
    row.isDirty = false;
    return row;
  });
}
