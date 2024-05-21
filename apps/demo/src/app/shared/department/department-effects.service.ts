import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { EffectService } from '@smart/smart-ngrx/effects/effect-service';

import { addIsDirty } from '../functions/add-is-dirty.function';
import { childrenTransform } from './children-transform.function';
import { Department } from './department.interface';

@Injectable()
export class DepartmentEffectsService extends EffectService<Department> {
  apiDepartments = './api/departments';
  constructor(private http: HttpClient) {
    super();
  }

  override loadByIds: (ids: string[]) => Observable<Department[]> = (
    ids: string[],
  ) => {
    return this.http
      .post<Department[]>(this.apiDepartments, ids)
      .pipe(map(childrenTransform));
  };

  override update: (newRow: Department) => Observable<Department[]> = (
    newRow: Department,
  ) => {
    return this.http
      .put<Department[]>(this.apiDepartments, {
        id: newRow.id,
        name: newRow.name,
      })
      .pipe(
        map((departments) => addIsDirty(departments) as Department[]),
        map(childrenTransform),
      );
  };

  override add: (row: Department) => Observable<Department[]> = (
    row: Department,
  ) => {
    return this.http.post<Department[]>(this.apiDepartments + '/add', row).pipe(
      map((departments) => addIsDirty(departments) as Department[]),
      map(childrenTransform),
    );
  };

  override delete: (id: string) => Observable<void> = (
    id: string,
  ): Observable<void> => {
    return this.http.delete<undefined>(`${this.apiDepartments}/${id}`);
  };
}
