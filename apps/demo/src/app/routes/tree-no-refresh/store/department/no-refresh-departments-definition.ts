/* jscpd:ignore-start -- intentionally duplicated */
import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';
import { markAndDelete } from '../mark-and-delete-init';

export const noRefreshDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    markAndDelete,
    defaultRow: (id) => ({
      id,
      name: '',
      children: {
        indexes: [],
        startIndex: 0,
        length: 0,
      },
    }),
  };
/* jscpd:ignore-end */
