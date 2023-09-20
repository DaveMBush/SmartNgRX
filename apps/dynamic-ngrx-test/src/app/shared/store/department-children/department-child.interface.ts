import { MarkAndDelete } from '@davembush/dynamic-ngrx/types/mark-and-delete.interface';

export interface DepartmentChild extends MarkAndDelete {
  id: string;
  name: string;
  children: DepartmentChild[] | string[];
}
