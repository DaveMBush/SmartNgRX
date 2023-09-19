import { EntityState } from '@ngrx/entity';

import { MarkAndDelete } from '@davembush/dynamic-ngrx/types/mark-and-delete.interface';

import { Space } from './space/space.interface';
import { SpaceChild } from './space-children/space-child.interface';
import { Workspace } from './workspace/workspace.interface';

export type WorkspaceEntity = EntityState<MarkAndDelete & Workspace>;
export type SpaceEntity = EntityState<Space>;
export type SpaceChildEntity = EntityState<SpaceChild>;
