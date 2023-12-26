import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from './entities';

export interface TreeStandardState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeStandardState2 {
  currentLocation: string;
}
