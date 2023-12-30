import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from '../../../shared/entities';

export interface TreeNoDirtyState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeNoDirtyState2 {
  currentLocation: string;
}
