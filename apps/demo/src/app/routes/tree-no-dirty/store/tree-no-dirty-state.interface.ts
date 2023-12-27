import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from './entities';

export interface TreeNoDirtyState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoDirtyState2 {
  currentLocation: string;
}
