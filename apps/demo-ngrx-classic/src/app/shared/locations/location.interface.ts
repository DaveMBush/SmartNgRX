import { SmartNgRXRowBase } from '@smarttools/smart-ngrx';

import { Department } from '../department/department.interface';

export interface Location extends SmartNgRXRowBase {
  id: string;
  name: string;
  departments: Department[] | string[];
}
