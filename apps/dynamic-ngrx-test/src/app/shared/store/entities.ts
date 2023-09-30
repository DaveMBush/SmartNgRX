import { EntityState } from '@ngrx/entity';

import { MarkAndDelete } from '@davembush/dynamic-ngrx/types/mark-and-delete.interface';

import { Department } from './department/department.interface';
import { DepartmentChild } from './department-children/department-child.interface';
import { Location } from './locations/location.interface';

export type LocationEntity = EntityState<Location & MarkAndDelete>;
export type DepartmentEntity = EntityState<Department>;
export type DepartmentChildEntity = EntityState<DepartmentChild>;
