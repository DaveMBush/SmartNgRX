import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

import { Department } from '../department/department.interface';

export interface Location extends SmartNgRXRowBase {
  id: string;
  name: string;
  departments: Department[] | string[];
}
