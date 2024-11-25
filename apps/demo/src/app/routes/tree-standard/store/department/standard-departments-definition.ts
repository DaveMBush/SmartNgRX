/* jscpd:ignore-start -- intentionally duplicated */
import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';

export const standardDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    defaultRow: function standardDepartmentsDefaultRowFunction(id) {
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
/* jscpd:ignore-end */
