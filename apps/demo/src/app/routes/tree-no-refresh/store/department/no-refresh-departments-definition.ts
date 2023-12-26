import { SmartEntityDefinition } from '@smart/smart-ngrx/types/smart-entity-definition.interface';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';

export const noRefreshDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    markAndDelete: {
      markDirtyFetchesNew: false,
    },
    defaultRow: (id) => ({
      id,
      name: '',
      children: [],
      isDirty: false,
    }),
  };
