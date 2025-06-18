import { Injectable } from '@angular/core';

import { CommonService } from '../department-children/common-service.class';

@Injectable({ providedIn: 'root' })
export class FoldersService extends CommonService {
  constructor() {
    super('./api/folders');
  }
}
