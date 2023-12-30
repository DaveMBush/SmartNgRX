import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from '../../../shared/entities';

export interface TreeNoRefreshState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoRefreshState2 {
  currentLocation: string;
}
