import { InjectionToken } from '@angular/core';

import { effectsFactory } from '@davembush/dynamic-ngrx/effects/effects.factory';

import { Space } from './space.interface';
import { SpaceEffectsService } from './space-effects.service';

export const spaceEffectsServiceToken = new InjectionToken<SpaceEffectsService>(
  'SpaceEffectsService'
);

export const spaceEffects = effectsFactory<'Space', Space>(
  'Space',
  spaceEffectsServiceToken
);
