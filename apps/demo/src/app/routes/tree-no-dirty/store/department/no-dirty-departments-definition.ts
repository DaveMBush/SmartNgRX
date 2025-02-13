/* jscpd:ignore-start -- intentionally duplicated */
import { SmartEntityDefinition } from '@smarttools/smart-ngrx';

import { Department } from '../../../../shared/department/department.interface';
import { departmentEffectsServiceToken } from '../../../../shared/department/department-effects.service-token';

export const noDirtyDepartmentsDefinition: SmartEntityDefinition<Department> = {
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
        startIndex: 0,
        length: 0,
      },
    };
  },
};
/* jscpd:ignore-end */
