import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { EffectService } from '@smart/smart-ngrx/effects/effect-service';

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
    return this.http
      .post<Department[]>('./api/departments', ids)
      .pipe(map(childrenTransform));
  };
}
