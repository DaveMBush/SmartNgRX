import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from '../../../shared/entities';

export interface TreeStandardState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}

export interface TreeStandardState2 {
  currentLocation: string;
}
