import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Doc } from './doc.interface';

@Injectable()
export class DocsService {
  constructor(private http: HttpClient) {}
  loadByIds(ids: string[]): Observable<Doc[]> {
    return this.http.post<Doc[]>('http://localhost:3000/api/docs', ids);
  }
}
