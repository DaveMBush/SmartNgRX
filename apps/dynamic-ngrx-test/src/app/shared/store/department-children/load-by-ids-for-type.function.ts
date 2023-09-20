import { catchError, map, Observable, of, timeout } from 'rxjs';

import { DepartmentChild } from './department-child.interface';

export function loadByIdsForType(
  service: {
    loadByIds(ids: string[]): Observable<Record<string, string>[]>;
  },
  ids: string[],
  type: string,
  idField = 'id'
): Observable<DepartmentChild[]> {
  return service.loadByIds(ids).pipe(
    map((items) =>
      items.map(
        (item) =>
          ({
            id: `${type}:${item[idField]}`,
            name: item['name'],
            children: [],
          } as DepartmentChild)
      )
    ),
    // wait for 1 second before calling this a failure
    timeout(1000),
    // catch any errors, including timeout, and just return
    // an empty array.
    catchError(() => of([] as DepartmentChild[]))
  );
}
