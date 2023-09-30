import { MarkAndDelete } from '@davembush/dynamic-ngrx/types/mark-and-delete.interface';

import { DepartmentChild } from '../department-children/department-child.interface';

export interface Department extends MarkAndDelete {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
