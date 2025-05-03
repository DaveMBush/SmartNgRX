import {
  PartialArrayDefinition,
  SmartArray,
  SmartNgRXRowBase,
} from '@smarttools/smart-signals';

export interface DepartmentChild extends SmartNgRXRowBase {
  id: string;
  name: string;
  children:
    | PartialArrayDefinition
    | SmartArray<DepartmentChild, DepartmentChild>;
}
