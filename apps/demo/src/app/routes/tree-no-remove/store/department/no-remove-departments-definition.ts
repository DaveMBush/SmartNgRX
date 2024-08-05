import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';

export const noRemoveDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    markAndDelete: {
      markDirtyTime: 2 * 60 * 1000,
      removeTime: 0,
    },
    children: {
      virtualChildren: 'virtual'
    },
    defaultRow: (id) => ({
      id,
      name: '',
      children: [],
      virtualChildren: {indexes: [], startIndex: 0, length: 0},
    }),
  };
