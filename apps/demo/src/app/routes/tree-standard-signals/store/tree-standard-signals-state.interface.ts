import { DepartmentChildEntity } from '../../../shared/entities/department-child-entity.type';
import { DepartmentEntity } from '../../../shared/entities/department-entity.type';
import { LocationEntity } from '../../../shared/entities/location-entity.type';
import { TopEntity } from '../../../shared/entities/top-entity.type';

export interface TreeStandardSignalsState {
  top: TopEntity;
  locations: LocationEntity;
  departments: DepartmentEntity;
  departmentChildren: DepartmentChildEntity;
}
