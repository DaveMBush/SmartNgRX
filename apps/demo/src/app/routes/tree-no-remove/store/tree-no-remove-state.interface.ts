import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from './entities';

export interface TreeNoRemoveState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoRemoveState2 {
  currentLocation: string;
}
