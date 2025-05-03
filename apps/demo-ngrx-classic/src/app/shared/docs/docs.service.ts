import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CommonService } from '../department-children/common-service.class';

@Injectable({ providedIn: 'root' })
export class DocsService extends CommonService {
  constructor(http: HttpClient) {
    super(http, './api/docs');
  }
}
