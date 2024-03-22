import { castTo } from '@smart/smart-ngrx/common/cast-to.function';

import { DepartmentChild } from './department-child.interface';

export function updateId(
  rows: DepartmentChild[],
  type: string,
  /* istanbul ignore next -- not a true condition */
  idName = 'id',
): DepartmentChild[] {
  return rows.map((row) => {
    const itemRecord = castTo<Record<string, string>>(row);
    return castTo<DepartmentChild>({
      ...row,
      id: `${type}:${itemRecord[idName]}`,
    });
  });
}
