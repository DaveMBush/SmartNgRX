import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';
import { departmentChildEffectsServiceToken } from '../../../../shared/department-children/department-child-effects.service-token';

export const noRemoveSignalsDepartmentChildrenDefinition: SmartEntityDefinition<DepartmentChild> =
  {
    entityName: 'departmentChildren',
    effectServiceToken: departmentChildEffectsServiceToken,
    markAndDelete: {
      markDirtyTime: 2 * 60 * 1000,
      removeTime: 0,
    },
    defaultRow: function noRemoveDepartmentChildrenDefaultRowFunction(id) {
      return {
        id,
        name: '',
        children: {
          indexes: [],
          startIndex: 0,
          length: 0,
        },
      };
    },
  };
