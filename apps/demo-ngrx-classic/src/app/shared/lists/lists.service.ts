import { Injectable } from '@angular/core';

import { CommonService } from '../department-children/common-service.class';

@Injectable({ providedIn: 'root' })
export class ListsService extends CommonService {
  constructor() {
    super('./api/lists');
  }
}
