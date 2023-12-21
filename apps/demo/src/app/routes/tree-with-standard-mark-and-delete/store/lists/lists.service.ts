import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { addIsDirty } from '../functions/add-is-dirty.function';
import { List } from './list.interface';

@Injectable()
export class ListsService {
  constructor(private http: HttpClient) {}
  loadByIds(ids: string[]): Observable<List[]> {
    return this.http
      .post<List[]>('./api/lists', ids)
      .pipe(map((lists) => addIsDirty(lists) as List[]));
  }
}
