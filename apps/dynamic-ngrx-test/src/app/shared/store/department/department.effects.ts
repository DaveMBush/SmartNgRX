import { InjectionToken } from '@angular/core';

import { effectsFactory } from '@davembush/dynamic-ngrx/effects/effects.factory';

import { Department } from './department.interface';
import { DepartmentEffectsService } from './department-effects.service';

export const departmentEffectsServiceToken =
  new InjectionToken<DepartmentEffectsService>('DepartmentEffectsService');

export const departmentEffects = effectsFactory<'Department', Department>(
  'Department',
  departmentEffectsServiceToken,
);
