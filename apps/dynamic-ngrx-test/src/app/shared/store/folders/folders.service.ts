import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Folder } from './folder.interface';

@Injectable()
export class FoldersService {
  constructor(private http: HttpClient) {}
  loadByIds(ids: string[]): Observable<Folder[]> {
    return this.http.post<Folder[]>('./api/folders', ids);
  }
}
