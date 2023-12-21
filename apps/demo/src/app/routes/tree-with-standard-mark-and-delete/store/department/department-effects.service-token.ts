import { InjectionToken } from '@angular/core';

import { DepartmentEffectsService } from './department-effects.service';

export const departmentEffectsServiceToken =
  new InjectionToken<DepartmentEffectsService>('DepartmentEffectsService');
