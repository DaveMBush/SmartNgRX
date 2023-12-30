import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { addIsDirty } from '../functions/add-is-dirty.function';
import { SprintFolder } from './sprint-folder.interface';

@Injectable({ providedIn: 'root' })
export class SprintFoldersService {
  constructor(private http: HttpClient) {}
  loadByIds(ids: string[]): Observable<SprintFolder[]> {
    return this.http
      .post<SprintFolder[]>('./api/sprintFolders', ids)
      .pipe(
        map((sprintFolders) => addIsDirty(sprintFolders) as SprintFolder[]),
      );
  }
}
