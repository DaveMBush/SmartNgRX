import { SmartNgRXRowBase } from '@smart/smart-ngrx';

export interface DepartmentChild extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
