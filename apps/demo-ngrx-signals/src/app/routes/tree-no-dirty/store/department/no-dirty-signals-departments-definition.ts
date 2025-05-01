/* jscpd:ignore-start -- intentionally duplicated */
import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';

export const noDirtySignalsDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    markAndDelete: {
      markDirtyTime: -1,
    },
    defaultRow: function noDirtyDepartmentsDefaultRowFunction(id) {
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
