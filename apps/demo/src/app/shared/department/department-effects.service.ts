import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

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

  override load: () => Observable<Department[]> = () => {
    return of([] as Department[]);
  };

  override loadByIds: (ids: string[]) => Observable<Department[]> = (
    ids: string[],
  ) => {
    return this.http.post<Department[]>(this.apiDepartments, ids).pipe(
      map((departments) => addIsDirty(departments) as Department[]),
      map(childrenTransform),
    );
  };

  override update: (
    oldRow: Department,
    newRow: Department,
  ) => Observable<Department[]> = (oldRow: Department, newRow: Department) => {
    return this.http
      .put<Department[]>(this.apiDepartments, {
        id: newRow.id,
        name: newRow.name,
      })
      .pipe(
        map((departments) => addIsDirty(departments) as Department[]),
        map(childrenTransform),
        catchError((_: unknown) => {
          // probably would want to send a message to the user here
          return of([oldRow]);
        }),
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
