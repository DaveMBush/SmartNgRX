import {
  PartialArrayDefinition,
  SmartArray,
  SmartNgRXRowBase,
} from '@smarttools/smart-ngrx';

import { DepartmentChild } from '../department-children/department-child.interface';

export interface Department extends SmartNgRXRowBase {
  id: string;
  name: string;
  children:
    | PartialArrayDefinition
    | SmartArray<Department, DepartmentChild>;
}
