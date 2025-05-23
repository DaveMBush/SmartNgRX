/* jscpd:ignore-start -- intentionally duplicated */
import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';

export const standardSignalsDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    defaultRow: function standardDepartmentsDefaultRowFunction(id) {
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
