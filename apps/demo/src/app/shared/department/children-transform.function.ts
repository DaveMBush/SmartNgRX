import { castTo } from '@smarttools/smart-ngrx';

import { Department } from './department.interface';

export function childrenTransform(departments: Department[]): Department[] {
  return departments.map((department) => {
    department.children = department.children.map((child) => {
      const c = castTo<{ type: string; id: string }>(child);
      return c.type + ':' + c.id;
    });
    return department;
  });
}
