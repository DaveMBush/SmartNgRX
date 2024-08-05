import { castTo } from '@smarttools/smart-ngrx';

import { Department } from './department.interface';

export function childrenTransform(departments: Department[]): Department[] {
  return departments.map((department) => {
    department.children = department.children.map((child) => {
      const c = castTo<{ type: string; id: string }>(child);
      return c.type + ':' + c.id;
    });
    // virtualChildren comes back as a number from the server,
    // we convert it to a PartialArrayDefinition for the code
    const length = castTo<number>(department.virtualChildren);
    department.virtualChildren = { length, indexes: [] as string[], startIndex: 0 };
    return department;
  });
}
