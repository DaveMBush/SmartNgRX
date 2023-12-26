import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from './entities';

export interface TreeNoRefreshState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoRefreshState2 {
  currentLocation: string;
}
