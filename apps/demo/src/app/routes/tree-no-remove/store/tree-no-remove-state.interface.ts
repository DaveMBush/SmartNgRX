import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from '../../../shared/entities';

export interface TreeNoRemoveState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoRemoveState2 {
  currentLocation: string;
}
