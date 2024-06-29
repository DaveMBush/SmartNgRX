import { castTo } from '@smart/smart-ngrx/common/cast-to.function';

import { DepartmentChild } from './department-child.interface';

export function updateId(
  rows: DepartmentChild[],
  type: string,
  /* istanbul ignore next -- not a true condition */
  idName = 'id',
): DepartmentChild[] {
  return rows.map((row) => {
    // convert the row to a record so we can access the idName
    const itemRecord = castTo<Record<string, string>>(row);
    return {
      ...row,
      id: `${type}:${itemRecord[idName]}`,
    };
  });
}
