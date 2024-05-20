import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
  TopEntity,
} from '../../../shared/entities';

export interface TreeStandardState {
  top: TopEntity;
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeStandardState2 {
  currentLocation: string;
}
