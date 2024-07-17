import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
  TopEntity,
} from '../../../shared/entities';

export interface TreeStandardVirtualState {
  top: TopEntity;
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeStandardVirtualState2 {
  currentLocation: string;
}
