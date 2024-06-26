import { EntityState } from '@ngrx/entity';

import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

import { Department } from './department/department.interface';
import { DepartmentChild } from './department-children/department-child.interface';
import { Location } from './locations/location.interface';
import { Top } from './top/top.interface';

export type TopEntity = EntityState<SmartNgRXRowBase & Top>;
export type LocationEntity = EntityState<Location & SmartNgRXRowBase>;
export type DepartmentEntity = EntityState<Department>;
export type DepartmentChildEntity = EntityState<DepartmentChild>;
