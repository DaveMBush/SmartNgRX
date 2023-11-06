import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

export interface DepartmentChild extends MarkAndDelete {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
