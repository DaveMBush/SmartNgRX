import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { DepartmentChild } from '../../../../shared/department-children/department-child.interface';
import { departmentChildEffectsServiceToken } from '../../../../shared/department-children/department-child-effects.service-token';

export const standardSignalsDepartmentChildrenDefinition: SmartEntityDefinition<DepartmentChild> =
  {
    entityName: 'departmentChildren',
    effectServiceToken: departmentChildEffectsServiceToken,
    isSignal: true,
    defaultRow: function standardDepartmentChildrenDefaultRowFunction(id) {
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
