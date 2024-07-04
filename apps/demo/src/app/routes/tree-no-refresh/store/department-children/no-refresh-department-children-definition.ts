import { SmartEntityDefinition } from '@smart/smart-ngrx';

import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';
import { departmentChildEffectsServiceToken } from '../../../../shared/department-children/department-child-effects.service-token';
import { markAndDelete } from '../mark-and-delete-init';

export const noRefreshDepartmentChildrenDefinition: SmartEntityDefinition<DepartmentChild> =
  {
    entityName: 'departmentChildren',
    effectServiceToken: departmentChildEffectsServiceToken,
    markAndDelete,
    defaultRow: (id) => ({
      id,
      name: '',
      children: [],
      isDirty: false,
    }),
  };
