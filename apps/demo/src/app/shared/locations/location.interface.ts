import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

import { Department } from '../department/department.interface';

export interface Location extends MarkAndDelete {
  id: string;
  name: string;
  departments: Department[] | string[];
}
