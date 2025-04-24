/* jscpd:ignore-start -- intentionally duplicated */
import { SmartEntityDefinition } from '@smarttools/smart-signals';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';
import { markAndDelete } from '../mark-and-delete-init';

export const noRefreshSignalsDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    markAndDelete,
    defaultRow: function noRefreshDepartmentsDefaultRowFunction(id) {
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
