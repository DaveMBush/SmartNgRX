import { EntityState } from '@ngrx/entity';
import { SmartNgRXRowBase } from '@smarttools/smart-signals';

import { Department } from '../department/department.interface';

export type DepartmentEntity = EntityState<Department & SmartNgRXRowBase>;
