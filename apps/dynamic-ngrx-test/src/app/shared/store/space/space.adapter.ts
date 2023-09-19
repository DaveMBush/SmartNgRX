import { createEntityAdapter } from '@ngrx/entity';

import { Space } from './space.interface';

export const spaceAdapter = createEntityAdapter<Space>();
