import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

export interface DepartmentChild extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
