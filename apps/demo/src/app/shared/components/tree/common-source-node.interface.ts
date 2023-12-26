import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

export interface CommonSourceNode extends MarkAndDelete {
  id: string;
  type?: string;
  name: string;
  children: CommonSourceNode[] | string[];
}
