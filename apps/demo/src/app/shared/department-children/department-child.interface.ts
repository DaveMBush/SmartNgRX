import {
  PartialArrayDefinition,
  SmartArray,
  SmartNgRXRowBase,
} from '@smarttools/smart-ngrx';

export interface DepartmentChild extends SmartNgRXRowBase {
  id: string;
  name: string;
  children:
    | PartialArrayDefinition
    | SmartArray<DepartmentChild, DepartmentChild>;
}
