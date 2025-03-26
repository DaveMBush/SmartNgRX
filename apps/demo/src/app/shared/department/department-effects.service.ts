import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EffectService, PartialArrayDefinition } from '@smarttools/smart-ngrx';
import { Observable } from 'rxjs';

import { Department } from './department.interface';

@Injectable()
export class DepartmentEffectsService extends EffectService<Department> {
  apiDepartments = './api/departments';
  constructor(private http: HttpClient) {
    super();
  }

  override loadByIds(ids: string[]): Observable<Department[]> {
    console.log('department-effects.service loadByIds');
    return this.http.post<Department[]>(this.apiDepartments, ids);
  }

  override update(newRow: Department): Observable<Department[]> {
    return this.http.put<Department[]>(this.apiDepartments, {
      id: newRow.id,
      name: newRow.name,
    });
  }

  override add(row: Department): Observable<Department[]> {
    return this.http.post<Department[]>(this.apiDepartments + '/add', row);
  }

  override delete(id: string): Observable<void> {
    return this.http.delete<undefined>(`${this.apiDepartments}/${id}`);
  }

  override loadByIndexes(
    parentId: string,
    childField: string,
    startIndex: number,
    length: number,
  ): Observable<PartialArrayDefinition> {
    console.log('department-effects.service loadByIndexes');
    return this.http.post<PartialArrayDefinition>(
      `${this.apiDepartments}/indexes`,
      {
        parentId,
        childField,
        startIndex,
        length,
      },
    );
  }
}
