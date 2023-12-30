import { SmartEntityDefinition } from '@smart/smart-ngrx/types/smart-entity-definition.interface';

import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';
import { departmentChildEffectsServiceToken } from '../../../../shared/department-children/department-child-effects.service-token';

export const noRemoveDepartmentChildrenDefinition: SmartEntityDefinition<DepartmentChild> =
  {
    entityName: 'departmentChildren',
    effectServiceToken: departmentChildEffectsServiceToken,
    markAndDelete: {
      markDirtyTime: 2 * 60 * 1000,
      removeTime: 0,
    },
    defaultRow: (id) => ({
      id,
      name: '',
      children: [],
      isDirty: false,
    }),
  };
