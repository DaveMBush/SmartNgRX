/* jscpd:ignore-start -- intentionally duplicated */
import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';

export const standardDepartmentsDefinition: SmartEntityDefinition<Department> =
  {
    entityName: 'departments',
    effectServiceToken: departmentEffectsServiceToken,
    // TODO: Remove markAndDelete before commit
    // it is here just for testing
    markAndDelete: {
      markDirtyFetchesNew: true,
      markDirtyTime: 2 * 60 * 1000,
      removeTime: 4 * 60 * 1000,
    },
    defaultRow: (id) => ({
      id,
      name: '',
      children: [],
      virtualChildren: {
        indexes: [],
        startIndex: 0,
        length: 0,
      },
    }),
  };
/* jscpd:ignore-end */
