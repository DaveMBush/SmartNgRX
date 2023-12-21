import { SmartEntityDefinition } from '@smart/smart-ngrx/types/smart-entity-definition.interface';

import { Department } from './department.interface';
import { departmentEffectsServiceToken } from './department-effects.service-token';

export const departmentsDefinition: SmartEntityDefinition<Department> = {
  entityName: 'departments',
  effectServiceToken: departmentEffectsServiceToken,
  defaultRow: (id) => ({
    id,
    name: '',
    children: [],
    isDirty: false,
  }),
};
