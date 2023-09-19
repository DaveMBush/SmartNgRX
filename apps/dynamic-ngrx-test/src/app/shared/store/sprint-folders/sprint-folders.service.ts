import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SprintFolder } from './sprint-folder.interface';

@Injectable()
export class SprintFoldersService {
  constructor(private http: HttpClient) {}
  loadByIds(ids: string[]): Observable<SprintFolder[]> {
    return this.http.post<SprintFolder[]>(
      'http://localhost:3000/api/sprintFolders',
      ids
    );
  }
}
