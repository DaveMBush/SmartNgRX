import { MarkAndDelete } from '@davembush/dynamic-ngrx/types/mark-and-delete.interface';

import { Space } from '../space/space.interface';

export interface Workspace extends MarkAndDelete {
  id: string;
  name: string;
  children: Space[] | string[];
}
