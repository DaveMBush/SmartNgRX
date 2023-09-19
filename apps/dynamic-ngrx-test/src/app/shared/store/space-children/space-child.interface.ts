import { MarkAndDelete } from '@davembush/dynamic-ngrx/types/mark-and-delete.interface';

export interface SpaceChild extends MarkAndDelete {
  id: string;
  name: string;
  children: SpaceChild[] | string[];
}
