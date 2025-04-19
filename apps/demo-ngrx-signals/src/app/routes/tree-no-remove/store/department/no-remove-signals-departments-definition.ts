/* jscpd:ignore-start -- intentionally duplicated */
import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';

export const noRemoveSignalsDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    markAndDelete: {
      markDirtyTime: 2 * 60 * 1000,
      removeTime: 0,
    },
    isSignal: true,
    defaultRow: function noRemoveDepartmentsDefaultRowFunction(id) {
      return {
        id,
        name: '',
        children: {
          indexes: [],
          length: 0,
        },
      };
    },
  };
/* jscpd:ignore-end */
