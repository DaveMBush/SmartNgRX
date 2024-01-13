import { map, Observable } from 'rxjs';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';

import { CommonService } from './common-service.class';
import { DepartmentChild } from './department-child.interface';

export function updateForType(
  service: CommonService,
  row: DepartmentChild,
  type: string,
  /* istanbul ignore next */
  idName: string = 'id', // this is just a default value that does not need to be tested
): Observable<DepartmentChild[]> {
  return service.update({ id: row.id, name: row.name }).pipe(
    map((items) =>
      items.map((item) => {
        const itemRecord = castTo<Record<string, string>>(item);
        return castTo<DepartmentChild>({
          ...item,
          id: `${type}:${itemRecord[idName]}`,
        });
      }),
    ),
  );
}
