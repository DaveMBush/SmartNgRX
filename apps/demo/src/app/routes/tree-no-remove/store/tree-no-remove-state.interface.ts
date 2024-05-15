import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
  TopEntity,
} from '../../../shared/entities';

export interface TreeNoRemoveState {
  top: TopEntity;
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoRemoveState2 {
  currentLocation: string;
}
