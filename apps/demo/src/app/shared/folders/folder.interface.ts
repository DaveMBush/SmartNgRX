import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

export interface Folder extends MarkAndDelete {
  id: string;
  name: string;
}
