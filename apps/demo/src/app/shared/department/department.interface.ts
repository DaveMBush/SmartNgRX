import { SmartNgRXRowBase } from '@smart/smart-ngrx';

import { DepartmentChild } from '../department-children/department-child.interface';

export interface Department extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
