import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

import { DepartmentChild } from '../department-children/department-child.interface';

export interface Department extends MarkAndDelete {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
