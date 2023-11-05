import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { List } from './list.interface';

@Injectable()
export class ListsService {
  constructor(private http: HttpClient) {}
  loadByIds(ids: string[]): Observable<List[]> {
    return this.http.post<List[]>('./api/lists', ids);
  }
}
