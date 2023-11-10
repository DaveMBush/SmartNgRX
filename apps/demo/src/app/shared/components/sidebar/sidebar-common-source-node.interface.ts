import { MarkAndDelete } from '@smart/smart-ngrx/types/mark-and-delete.interface';

export interface SidebarCommonSourceNode extends MarkAndDelete {
  id: string;
  type?: string;
  name: string;
  children: SidebarCommonSourceNode[] | string[];
}
