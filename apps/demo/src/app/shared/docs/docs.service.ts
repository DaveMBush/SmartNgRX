import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { addIsDirty } from '../functions/add-is-dirty.function';
import { Doc } from './doc.interface';

@Injectable({ providedIn: 'root' })
export class DocsService {
  constructor(private http: HttpClient) {}
  loadByIds(ids: string[]): Observable<Doc[]> {
    return this.http
      .post<Doc[]>('./api/docs', ids)
      .pipe(map((docs) => addIsDirty(docs) as Doc[]));
  }
}
