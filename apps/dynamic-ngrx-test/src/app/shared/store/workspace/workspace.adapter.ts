import { createEntityAdapter } from '@ngrx/entity';

import { Workspace } from './workspace.interface';

export const workspaceAdapter = createEntityAdapter<Workspace>();
