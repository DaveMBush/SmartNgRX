import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

export interface Doc extends MarkAndDelete {
  did: string;
  name: string;
}
