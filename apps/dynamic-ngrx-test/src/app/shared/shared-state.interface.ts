import {
  DepartmentChildEntity,
  DepartmentEntity,
  LocationEntity,
} from './store/entities';

export interface SharedState {
  locations: LocationEntity;
  departments: DepartmentEntity;
  currentLocation: string;
  departmentChildren: DepartmentChildEntity;
}
