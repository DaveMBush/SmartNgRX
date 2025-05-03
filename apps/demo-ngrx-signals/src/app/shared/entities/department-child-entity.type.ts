import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/smart-signals';

import { DepartmentChild } from '../department-children/department-child.interface';

export type DepartmentChildEntity = EntityState<
  DepartmentChild & SmartNgRXRowBase
>;
