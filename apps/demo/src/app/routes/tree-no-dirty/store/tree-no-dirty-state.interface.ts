import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
  TopEntity,
} from '../../../shared/entities';

export interface TreeNoDirtyState {
  top: TopEntity;
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoDirtyState2 {
  currentLocation: string;
}
