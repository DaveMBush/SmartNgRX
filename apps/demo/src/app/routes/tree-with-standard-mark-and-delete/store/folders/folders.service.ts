import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { addIsDirty } from '../functions/add-is-dirty.function';
import { Folder } from './folder.interface';

@Injectable()
export class FoldersService {
  constructor(private http: HttpClient) {}
  loadByIds(ids: string[]): Observable<Folder[]> {
    return this.http
      .post<Folder[]>('./api/folders', ids)
      .pipe(map((folders) => addIsDirty(folders) as Folder[]));
  }
}
