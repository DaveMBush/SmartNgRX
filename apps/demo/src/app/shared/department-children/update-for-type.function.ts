import { map, Observable } from 'rxjs';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';

import { CommonService } from './common-service.class';
import { DepartmentChild } from './department-child.interface';

export function updateForType(
  service: CommonService,
  row: DepartmentChild,
  type: string = 'id',
): Observable<DepartmentChild[]> {
  return service.update(row).pipe(
    map((items) =>
      items.map((item) => {
        const itemRecord = castTo<Record<string, string>>(item);
        return castTo<DepartmentChild>({
          ...item,
          id: `docs:${itemRecord[type]}`,
        });
      }),
    ),
  );
}
