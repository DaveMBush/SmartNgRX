import { MarkAndDelete } from './mark-and-delete.interface';

export interface EntityAttributes {
  defaultRow(id: string): MarkAndDelete;
}
