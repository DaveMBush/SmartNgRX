import { createEntityAdapter } from '@ngrx/entity';

import { SpaceChild } from './space-child.interface';

export const sprintFolderAdapter = createEntityAdapter<SpaceChild>();
