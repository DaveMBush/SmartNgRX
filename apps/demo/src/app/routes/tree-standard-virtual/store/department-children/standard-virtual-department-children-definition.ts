import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';
import { departmentChildEffectsServiceToken } from '../../../../shared/department-children/department-child-effects.service-token';

export const standardVirtualDepartmentChildrenDefinition: SmartEntityDefinition<DepartmentChild> =
  {
    entityName: 'departmentChildren',
    effectServiceToken: departmentChildEffectsServiceToken,
    defaultRow: (id) => ({
      id,
      name: '',
      children: [],
    }),
  };
