import { createEntityAdapter } from '@ngrx/entity';

import { DepartmentChild } from './department-child.interface';

export const departmentFolderAdapter = createEntityAdapter<DepartmentChild>();
