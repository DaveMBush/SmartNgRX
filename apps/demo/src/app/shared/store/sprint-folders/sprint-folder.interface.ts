import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

export interface SprintFolder extends MarkAndDelete {
  id: string;
  name: string;
}
