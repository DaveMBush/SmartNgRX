import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';
import { markAndDelete } from '../mark-and-delete-init';

export const noRefreshDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    markAndDelete,
    children: {
      virtualChildren: 'virtual'
    },
    defaultRow: (id) => ({
      id,
      name: '',
      children: [],
      virtualChildren: 0,
    }),
  };
