import { EntityDefinition } from '@davembush/dynamic-ngrx/types/entity-definition.interface';

import { Department } from './department.interface';
import { departmentEffectsServiceToken } from './department-effects.service-token';

export const departmentsDefinition: EntityDefinition<Department> = {
  fieldName: 'departments',
  effectServiceToken: departmentEffectsServiceToken,
  defaultRow: (id) => ({
    id,
    name: '',
    children: [],
    isDirty: false,
  }),
};
