import { InjectionToken } from '@angular/core';

import { effectsFactory } from '@davembush/dynamic-ngrx/effects/effects.factory';

import { DepartmentChild } from './department-child.interface';
import { DepartmentChildEffectsService } from './department-child-effects.service';

export const departmentChildEffectsServiceToken =
  new InjectionToken<DepartmentChildEffectsService>('DepartmentEffectsService');

export const departmentChildEffects = effectsFactory<
  'DepartmentChild',
  DepartmentChild
>('DepartmentChild', departmentChildEffectsServiceToken);
