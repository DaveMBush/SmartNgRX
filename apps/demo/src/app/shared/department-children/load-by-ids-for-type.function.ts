import { catchError, map, Observable, of, timeout } from 'rxjs';

import { CommonService } from './common-service.class';
import { DepartmentChild } from './department-child.interface';

export function loadByIdsForType(
  service: CommonService,
  ids: string[],
  type: string,
  idField = 'id',
): Observable<DepartmentChild[]> {
  return service.loadByIds(ids).pipe(
    map(function loadByIdsForTypeMapItems(items): DepartmentChild[] {
      return items.map(function loadByIdsForTypeMapRowItem(item) {
        const fieldValue = item[idField as keyof DepartmentChild] as string;
        return {
          id: `${type}:${fieldValue}`,
          name: item.name,
          children: [],
        } as DepartmentChild;
      });
    }),
    // wait for 1 second before calling this a failure
    timeout(1000),
    // catch any errors, including timeout, and just return
    // an empty array.
    catchError(function loadByIdsForTypeCatchError(): Observable<
      DepartmentChild[]
    > {
      return of([] as DepartmentChild[]);
    }),
  );
}
