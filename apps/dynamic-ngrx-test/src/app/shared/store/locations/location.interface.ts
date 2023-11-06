import { MarkAndDelete } from '@davembush/dynamic-ngrx/types/mark-and-delete.interface';

import { Department } from '../department/department.interface';

export interface Location extends MarkAndDelete {
  id: string;
  name: string;
  departments: Department[] | string[];
}
