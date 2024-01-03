import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CommonService } from '../department-children/common-service.class';

@Injectable({ providedIn: 'root' })
export class SprintFoldersService extends CommonService {
  constructor(http: HttpClient) {
    super(http, './api/sprintFolders');
  }
}
