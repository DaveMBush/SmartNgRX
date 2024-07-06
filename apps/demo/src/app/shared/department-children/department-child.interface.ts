import { SmartNgRXRowBase } from '@smarttools/smart-ngrx';

export interface DepartmentChild extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
