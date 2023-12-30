import { EntityState } from '@ngrx/entity';

import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

import { Department } from '../../../shared/department/department.interface';
import { DepartmentChild } from '../../../shared/department-children/department-child.interface';
import { Location } from '../../../shared/locations/location.interface';

export type LocationEntity = EntityState<Location & MarkAndDelete>;
export type DepartmentEntity = EntityState<Department>;
export type DepartmentChildEntity = EntityState<DepartmentChild>;
