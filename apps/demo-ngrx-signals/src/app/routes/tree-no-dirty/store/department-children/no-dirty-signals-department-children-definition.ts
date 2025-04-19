import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';
import { departmentChildEffectsServiceToken } from '../../../../shared/department-children/department-child-effects.service-token';

export const noDirtySignalsDepartmentChildrenDefinition: SmartEntityDefinition<DepartmentChild> =
  {
    entityName: 'departmentChildren',
    effectServiceToken: departmentChildEffectsServiceToken,
    markAndDelete: {
      markDirtyTime: -1,
    },

    isSignal: true,
    defaultRow: function noDirtyDepartmentChildrenDefaultRowFunction(id) {
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
