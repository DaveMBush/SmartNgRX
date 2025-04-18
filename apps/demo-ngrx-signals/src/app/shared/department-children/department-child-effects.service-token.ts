import { InjectionToken } from '@angular/core';

import { DepartmentChildEffectsService } from './department-child-effects.service';

export const departmentChildEffectsServiceToken =
  new InjectionToken<DepartmentChildEffectsService>(
    'DepartmentChildEffectsService',
  );
