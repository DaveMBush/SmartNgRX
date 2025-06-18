import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EffectService, PartialArrayDefinition } from '@smarttools/smart-ngrx';
import { Observable, of } from 'rxjs';

import { Top } from './top.interface';

@Injectable()
export class TopEffectsService extends EffectService<Top> {
  private apiTop = './api/top';
  private http = inject(HttpClient);

  override loadByIds(ids: string[]): Observable<Top[]> {
    return this.http.post<Top[]>(this.apiTop, ids);
  }

  override loadByIndexes(
    _: string,
    __: string,
    ___: number,
    ____: number,
  ): Observable<PartialArrayDefinition> {
    // intentionally unimplemented
    throw new Error('Method not implemented.');
  }

  override update(_: Top): Observable<Top[]> {
    return of([]);
  }

  override add(_: Top): Observable<Top[]> {
    return of([]);
  }

  override delete(_: string): Observable<void> {
    return of();
  }
}
