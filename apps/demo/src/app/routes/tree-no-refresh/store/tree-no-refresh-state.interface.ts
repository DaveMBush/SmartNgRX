import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
  TopEntity,
} from '../../../shared/entities';

export interface TreeNoRefreshState {
  top: TopEntity;
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoRefreshState2 {
  currentLocation: string;
}
