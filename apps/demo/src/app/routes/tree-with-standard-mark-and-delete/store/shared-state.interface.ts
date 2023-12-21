import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from './entities';

export interface SharedState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface SharedState2 {
  currentLocation: string;
}
