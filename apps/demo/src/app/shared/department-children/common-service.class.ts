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
    return this.http
      .post<DepartmentChild[]>(this.path, ids)
      .pipe(map((rows) => addIsDirty(rows)));
  }

  update(row: DepartmentChild): Observable<DepartmentChild[]> {
    return this.http
      .put<DepartmentChild[]>('./api/docs', [row])
      .pipe(map((docs) => addIsDirty(docs)));
  }
}
