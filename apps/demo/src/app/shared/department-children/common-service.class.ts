import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { addIsDirty } from '../functions/add-is-dirty.function';
import { DepartmentChild } from './department-child.interface';

export class CommonService {
  constructor(
    private http: HttpClient,
    private path: string,
  ) {}

  loadByIds(ids: string[]): Observable<DepartmentChild[]> {
    return this.http.post<DepartmentChild[]>(this.path, ids).pipe(
      map(function mapLoadByIdsRowsToDirty(rows) {
        return addIsDirty(rows);
      }),
    );
  }

  update(
    row: Pick<DepartmentChild, 'id' | 'name'>,
  ): Observable<DepartmentChild[]> {
    return this.http.put<DepartmentChild[]>(this.path, row).pipe(
      map(function mapUpdateRowsToDirty(rows) {
        return addIsDirty(rows);
      }),
    );
  }

  add(row: DepartmentChild): Observable<DepartmentChild[]> {
    return this.http.post<DepartmentChild[]>(this.path + '/add', row).pipe(
      map(function mapAddRowsToDirty(rows) {
        return addIsDirty(rows);
      }),
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<undefined>(`${this.path}/${id}`);
  }
}
