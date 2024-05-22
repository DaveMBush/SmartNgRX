import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EffectService } from '@smart/smart-ngrx/index';

import { Top } from './top.interface';

@Injectable()
export class TopEffectsService extends EffectService<Top> {
  private apiTop = './api/top';

  constructor(private http: HttpClient) {
    super();
  }

  override loadByIds: (ids: string[]) => Observable<Top[]> = (
    ids: string[],
  ) => {
    return this.http.post<Top[]>(this.apiTop, ids);
  };

  override update: (newRow: Top) => Observable<Top[]> = (_: Top) => {
    return of([]);
  };

  override add: (row: Top) => Observable<Top[]> = (_: Top) => {
    return of([]);
  };

  override delete: (id: string) => Observable<void> = (_: string) => {
    return of();
  };
}
