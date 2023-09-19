import { InjectionToken } from '@angular/core';

import { effectsFactory } from '@davembush/dynamic-ngrx/effects/effects.factory';

import { SpaceChild } from './space-child.interface';
import { SpaceChildEffectsService } from './space-child-effects.service';

export const spaceChildEffectsServiceToken =
  new InjectionToken<SpaceChildEffectsService>('SprintFolderEffectsService');

export const spaceChildEffects = effectsFactory<'SpaceChild', SpaceChild>(
  'SpaceChild',
  spaceChildEffectsServiceToken
);
