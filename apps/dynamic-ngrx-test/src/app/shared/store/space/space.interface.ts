import { MarkAndDelete } from '@davembush/dynamic-ngrx/types/mark-and-delete.interface';

import { SpaceChild } from '../space-children/space-child.interface';

export interface Space extends MarkAndDelete {
  id: string;
  name: string;
  children: SpaceChild[] | string[];
}

export interface ResolvedSpace extends Space {
  children: SpaceChild[];
}
