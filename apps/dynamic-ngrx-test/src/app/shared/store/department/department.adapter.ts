import { createEntityAdapter } from '@ngrx/entity';

import { Department } from './department.interface';

export const departmentAdapter = createEntityAdapter<Department>();
