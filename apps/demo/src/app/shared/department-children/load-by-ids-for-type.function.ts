import { catchError, map, Observable, of, timeout } from 'rxjs';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';

import { CommonService } from './common-service.class';
import { DepartmentChild } from './department-child.interface';

export function loadByIdsForType(
  service: CommonService,
  ids: string[],
  type: string,
  idField = 'id',
): Observable<DepartmentChild[]> {
  return service.loadByIds(ids).pipe(
    map((items) =>
      items.map((item) => {
        // convert the item to a record
        const itemRecord = castTo<Record<string, string>>(item);
        return {
          id: `${type}:${itemRecord[idField]}`,
          name: item.name,
          children: [],
        } as DepartmentChild;
      }),
    ),
    // wait for 1 second before calling this a failure
    timeout(1000),
    // catch any errors, including timeout, and just return
    // an empty array.
    catchError(() => of([] as DepartmentChild[])),
  );
}
