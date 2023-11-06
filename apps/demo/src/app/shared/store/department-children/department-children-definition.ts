import { EntityDefinition } from '@smart/smart-ngrx/types/entity-definition.interface';

import { DepartmentChild } from './department-child.interface';
import { departmentChildEffectsServiceToken } from './department-child-effects.service-token';

export const departmentChildrenDefinition: EntityDefinition<DepartmentChild> = {
  fieldName: 'departmentChildren',
  effectServiceToken: departmentChildEffectsServiceToken,
  defaultRow: (id) => ({
    id,
    name: '',
    children: [],
    isDirty: false,
  }),
};
