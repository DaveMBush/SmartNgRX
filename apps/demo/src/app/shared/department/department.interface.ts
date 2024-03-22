import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

import { DepartmentChild } from '../department-children/department-child.interface';

export interface Department extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
