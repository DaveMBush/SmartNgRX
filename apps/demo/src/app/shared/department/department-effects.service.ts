import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { EffectService } from '@smart/smart-ngrx/effects/effect-service';

import { addIsDirty } from '../functions/add-is-dirty.function';
import { childrenTransform } from './children-transform.function';
import { Department } from './department.interface';

@Injectable()
export class DepartmentEffectsService extends EffectService<Department> {
  constructor(private http: HttpClient) {
    super();
  }

  override load: () => Observable<Department[]> = () => {
    return of([] as Department[]);
  };

  override loadByIds: (ids: string[]) => Observable<Department[]> = (
    ids: string[],
  ) => {
    return this.http.post<Department[]>('./api/departments', ids).pipe(
      map((departments) => addIsDirty(departments) as Department[]),
      map(childrenTransform),
    );
  };

  override update: (row: Department) => Observable<Department[]> = (
    row: Department,
  ) => {
    return this.http.put<Department[]>('./api/departments', [row]).pipe(
      map((departments) => addIsDirty(departments) as Department[]),
      map(childrenTransform),
    );
  };
}
